import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import AdminPage from './AdminPage';

vi.mock('./Header', () => ({
    default: () => <div data-testid="header">Header</div>
}));

vi.mock('./Footer', () => ({
    default: () => <div data-testid="footer">Footer</div>
}));

describe('AdminPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders admin portal title', () => {
        render(
            <MemoryRouter>
                <AdminPage />
            </MemoryRouter>
        );
        
        expect(screen.getByText('Welcome to the admin portal.')).toBeInTheDocument();
    });

    it('renders sale percent label', () => {
        render(
            <MemoryRouter>
                <AdminPage />
            </MemoryRouter>
        );
        
        expect(screen.getByText(/Set Sale Percent/)).toBeInTheDocument();
    });

    it('renders input field for sale percent', () => {
        render(
            <MemoryRouter>
                <AdminPage />
            </MemoryRouter>
        );
        
        const input = screen.getByDisplayValue('0') as HTMLInputElement;
        expect(input).toBeInTheDocument();
        expect(input.id).toBe('salePercent');
    });

    it('renders submit button', () => {
        render(
            <MemoryRouter>
                <AdminPage />
            </MemoryRouter>
        );
        
        expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    it('renders end sale button', () => {
        render(
            <MemoryRouter>
                <AdminPage />
            </MemoryRouter>
        );
        
        expect(screen.getByText('End Sale')).toBeInTheDocument();
    });

    it('updates sale percent when valid number is entered', () => {
        render(
            <MemoryRouter>
                <AdminPage />
            </MemoryRouter>
        );
        
        const input = screen.getByDisplayValue('0') as HTMLInputElement;
        const submitBtn = screen.getByText('Submit');
        
        fireEvent.change(input, { target: { value: '20' } });
        fireEvent.click(submitBtn);
        
        expect(screen.getByText('All products are 20% off!')).toBeInTheDocument();
    });

    it('displays no sale active message initially', () => {
        render(
            <MemoryRouter>
                <AdminPage />
            </MemoryRouter>
        );
        
        expect(screen.getByText('No sale active.')).toBeInTheDocument();
    });

    it('shows error message for invalid input', () => {
        render(
            <MemoryRouter>
                <AdminPage />
            </MemoryRouter>
        );
        
        const input = screen.getByDisplayValue('0') as HTMLInputElement;
        const submitBtn = screen.getByText('Submit');
        
        fireEvent.change(input, { target: { value: 'invalid' } });
        fireEvent.click(submitBtn);
        
        expect(screen.getByText(/Invalid input/)).toBeInTheDocument();
    });

    it('resets sale when end sale button is clicked', () => {
        render(
            <MemoryRouter>
                <AdminPage />
            </MemoryRouter>
        );
        
        const input = screen.getByDisplayValue('0') as HTMLInputElement;
        const submitBtn = screen.getByText('Submit');
        const endSaleBtn = screen.getByText('End Sale');
        
        // Set a sale
        fireEvent.change(input, { target: { value: '30' } });
        fireEvent.click(submitBtn);
        
        expect(screen.getByText('All products are 30% off!')).toBeInTheDocument();
        
        // End the sale
        fireEvent.click(endSaleBtn);
        
        expect(screen.getByText('No sale active.')).toBeInTheDocument();
    });

    it('updates input value when changed', () => {
        render(
            <MemoryRouter>
                <AdminPage />
            </MemoryRouter>
        );
        
        const input = screen.getByDisplayValue('0') as HTMLInputElement;
        fireEvent.change(input, { target: { value: '50' } });
        
        expect(input.value).toBe('50');
    });

    it('renders back to storefront button', () => {
        render(
            <MemoryRouter>
                <AdminPage />
            </MemoryRouter>
        );
        
        expect(screen.getByText('Back to Storefront')).toBeInTheDocument();
    });

    it('back to storefront button links to home', () => {
        render(
            <MemoryRouter>
                <AdminPage />
            </MemoryRouter>
        );
        
        const backBtn = screen.getByText('Back to Storefront').closest('a');
        expect(backBtn).toHaveAttribute('href', '/');
    });

    it('renders header and footer', () => {
        render(
            <MemoryRouter>
                <AdminPage />
            </MemoryRouter>
        );
        
        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('handles decimal numbers as valid input', () => {
        render(
            <MemoryRouter>
                <AdminPage />
            </MemoryRouter>
        );
        
        const input = screen.getByDisplayValue('0') as HTMLInputElement;
        const submitBtn = screen.getByText('Submit');
        
        fireEvent.change(input, { target: { value: '25.5' } });
        fireEvent.click(submitBtn);
        
        expect(screen.getByText('All products are 25.5% off!')).toBeInTheDocument();
    });

    it('handles zero as valid input', () => {
        render(
            <MemoryRouter>
                <AdminPage />
            </MemoryRouter>
        );
        
        const input = screen.getByDisplayValue('0') as HTMLInputElement;
        const submitBtn = screen.getByText('Submit');
        
        fireEvent.change(input, { target: { value: '0' } });
        fireEvent.click(submitBtn);
        
        expect(screen.getByText('No sale active.')).toBeInTheDocument();
    });
});
