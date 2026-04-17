import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

const renderWithRouter = (component: React.ReactNode) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Header', () => {
    it('displays the app title', () => {
        renderWithRouter(<Header />);
        expect(screen.getByText('The Daily Harvest')).toBeInTheDocument();
    });

    it('renders navigation links', () => {
        renderWithRouter(<Header />);
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Products')).toBeInTheDocument();
        expect(screen.getByText('Cart')).toBeInTheDocument();
        expect(screen.getByText('Contact Us')).toBeInTheDocument();
    });

    it('renders admin login button', () => {
        renderWithRouter(<Header />);
        expect(screen.getByText('Admin Login')).toBeInTheDocument();
    });

    it('has correct navigation links href', () => {
        renderWithRouter(<Header />);
        const homeLink = screen.getByText('Home').closest('a');
        const productsLink = screen.getByText('Products').closest('a');
        const cartLink = screen.getByText('Cart').closest('a');
        const contactLink = screen.getByText('Contact Us').closest('a');
        
        expect(homeLink).toHaveAttribute('href', '/');
        expect(productsLink).toHaveAttribute('href', '/products');
        expect(cartLink).toHaveAttribute('href', '/cart');
        expect(contactLink).toHaveAttribute('href', '/contact');
    });

    it('admin login button link points to login page', () => {
        renderWithRouter(<Header />);
        const loginBtn = screen.getByText('Admin Login').closest('a');
        expect(loginBtn).toHaveAttribute('href', '/login');
    });
});
