import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import HomePage from './HomePage';

vi.mock('./Header', () => ({
    default: () => <div data-testid="header">Header</div>
}));

vi.mock('./Footer', () => ({
    default: () => <div data-testid="footer">Footer</div>
}));

describe('HomePage', () => {
    it('renders the home page title', () => {
        render(<HomePage />);
        expect(screen.getByText('Welcome to the The Daily Harvest!')).toBeInTheDocument();
    });

    it('displays welcome message with products link', () => {
        render(<HomePage />);
        expect(screen.getByText("Check out our products page for some great deals.")).toBeInTheDocument();
    });

    it('renders header component', () => {
        render(<HomePage />);
        expect(screen.getByTestId('header')).toBeInTheDocument();
    });

    it('renders footer component', () => {
        render(<HomePage />);
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });
});
