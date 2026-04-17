import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

vi.mock('./components/HomePage', () => ({
    default: () => <div data-testid="home-page">HomePage</div>
}));

vi.mock('./components/ProductsPage', () => ({
    default: () => <div data-testid="products-page">ProductsPage</div>
}));

vi.mock('./components/LoginPage', () => ({
    default: () => <div data-testid="login-page">LoginPage</div>
}));

vi.mock('./components/AdminPage', () => ({
    default: () => <div data-testid="admin-page">AdminPage</div>
}));

vi.mock('./components/CartPage', () => ({
    default: () => <div data-testid="cart-page">CartPage</div>
}));

vi.mock('./components/ContactPage', () => ({
    default: () => <div data-testid="contact-page">ContactPage</div>
}));

describe('App', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders CartProvider wrapper', () => {
        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        );
        // If CartProvider is working, the app should render without errors
        expect(screen.queryByTestId('home-page')).not.toBeNull();
    });

    it('renders HomePage on root path', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByTestId('home-page')).toBeInTheDocument();
    });

    it('renders ProductsPage on /products path', () => {
        render(
            <MemoryRouter initialEntries={['/products']}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByTestId('products-page')).toBeInTheDocument();
    });

    it('renders LoginPage on /login path', () => {
        render(
            <MemoryRouter initialEntries={['/login']}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByTestId('login-page')).toBeInTheDocument();
    });

    it('renders AdminPage on /admin path', () => {
        render(
            <MemoryRouter initialEntries={['/admin']}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByTestId('admin-page')).toBeInTheDocument();
    });

    it('renders CartPage on /cart path', () => {
        render(
            <MemoryRouter initialEntries={['/cart']}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByTestId('cart-page')).toBeInTheDocument();
    });

    it('renders ContactPage on /contact path', () => {
        render(
            <MemoryRouter initialEntries={['/contact']}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByTestId('contact-page')).toBeInTheDocument();
    });

    it('renders App without errors', () => {
        const { container } = render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        );
        expect(container).toBeInTheDocument();
    });
});
