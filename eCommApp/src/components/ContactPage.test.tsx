import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import ContactPage from './ContactPage';

vi.mock('./Header', () => ({
    default: () => <div data-testid="header">Header</div>
}));

vi.mock('./Footer', () => ({
    default: () => <div data-testid="footer">Footer</div>
}));

describe('ContactPage', () => {
    it('renders contact form fields and submit button', () => {
        render(<ContactPage />);

        expect(screen.getByText('Contact Us')).toBeInTheDocument();
        expect(screen.getByLabelText('Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
        expect(screen.getByLabelText('Issue')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });

    it('renders header and footer', () => {
        render(<ContactPage />);

        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });
});
