import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ContactPage from './ContactPage';

vi.mock('./Header', () => ({
    default: () => <div data-testid="header">Header</div>
}));

vi.mock('./Footer', () => ({
    default: () => <div data-testid="footer">Footer</div>
}));

describe('ContactPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders contact form fields', () => {
        render(
            <MemoryRouter>
                <ContactPage />
            </MemoryRouter>
        );

        expect(screen.getByText('Contact Us')).toBeInTheDocument();
        expect(screen.getByText('Issue inspiration from similar GitHub projects')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'saleor/storefront' })).toBeInTheDocument();
        expect(screen.getByLabelText('Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email address')).toBeInTheDocument();
        expect(screen.getByLabelText('Issue')).toBeInTheDocument();
        expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    it('updates form inputs when typed', () => {
        render(
            <MemoryRouter>
                <ContactPage />
            </MemoryRouter>
        );

        const nameInput = screen.getByPlaceholderText('Your name') as HTMLInputElement;
        const emailInput = screen.getByPlaceholderText('you@example.com') as HTMLInputElement;
        const issueInput = screen.getByPlaceholderText('Tell us about the issue') as HTMLTextAreaElement;

        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(issueInput, { target: { value: 'App is great!' } });

        expect(nameInput.value).toBe('John Doe');
        expect(emailInput.value).toBe('john@example.com');
        expect(issueInput.value).toBe('App is great!');
    });

    it('shows confirmation after submitting the form', () => {
        render(
            <MemoryRouter>
                <ContactPage />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('Your name'), { target: { value: 'Jane' } });
        fireEvent.change(screen.getByPlaceholderText('you@example.com'), { target: { value: 'jane@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Tell us about the issue'), { target: { value: 'Need help' } });

        fireEvent.click(screen.getByText('Submit'));

        expect(screen.getByText('Thanks for reaching out! We will get back to you soon.')).toBeInTheDocument();
    });

    it('prefills issue field with inspiration ideas', () => {
        render(
            <MemoryRouter>
                <ContactPage />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByRole('button', { name: 'Use these ideas in my issue' }));

        expect(screen.getByDisplayValue(/Website improvement inspiration:/)).toBeInTheDocument();
        expect(screen.getByDisplayValue(/1\. Add product filtering\/sorting/)).toBeInTheDocument();
    });
});
