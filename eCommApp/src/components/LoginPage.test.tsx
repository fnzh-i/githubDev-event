import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './LoginPage';

vi.mock('./Header', () => ({
    default: () => <div data-testid="header">Header</div>
}));

vi.mock('./Footer', () => ({
    default: () => <div data-testid="footer">Footer</div>
}));

describe('LoginPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders login form with title', () => {
        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );
        
        expect(screen.getByText('Admin Login')).toBeInTheDocument();
    });

    it('renders username input field', () => {
        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );
        
        const usernameInput = screen.getByPlaceholderText('Username') as HTMLInputElement;
        expect(usernameInput).toBeInTheDocument();
    });

    it('renders password input field with correct type', () => {
        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );
        
        const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;
        expect(passwordInput).toBeInTheDocument();
        expect(passwordInput.type).toBe('password');
    });

    it('renders login button', () => {
        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );
        
        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    it('updates username input value when typed', () => {
        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );
        
        const usernameInput = screen.getByPlaceholderText('Username') as HTMLInputElement;
        fireEvent.change(usernameInput, { target: { value: 'admin' } });
        
        expect(usernameInput.value).toBe('admin');
    });

    it('updates password input value when typed', () => {
        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );
        
        const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;
        fireEvent.change(passwordInput, { target: { value: 'admin' } });
        
        expect(passwordInput.value).toBe('admin');
    });

    it('shows error message for invalid credentials', () => {
        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );
        
        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const loginBtn = screen.getByText('Login');
        
        fireEvent.change(usernameInput, { target: { value: 'invalid' } });
        fireEvent.change(passwordInput, { target: { value: 'invalid' } });
        fireEvent.click(loginBtn);
        
        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });

    it('does not show error message initially', () => {
        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );
        
        expect(screen.queryByText('Invalid credentials')).not.toBeInTheDocument();
    });

    it('renders header and footer components', () => {
        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );
        
        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });
});
