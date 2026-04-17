import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import ProductsPage from './ProductsPage';
import { CartContext } from '../context/CartContext';

vi.mock('./Header', () => ({
    default: () => <div data-testid="header">Header</div>
}));

vi.mock('./Footer', () => ({
    default: () => <div data-testid="footer">Footer</div>
}));

vi.mock('./ReviewModal', () => ({
    default: () => <div data-testid="review-modal">ReviewModal</div>
}));

const mockCartContext = {
    cartItems: [],
    addToCart: vi.fn(),
    clearCart: vi.fn()
};

describe('ProductsPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        global.fetch = vi.fn();
    });

    it('shows loading state initially', () => {
        (global.fetch as any).mockImplementation(() => new Promise(() => {}));
        
        render(
            <CartContext.Provider value={mockCartContext}>
                <ProductsPage />
            </CartContext.Provider>
        );
        
        expect(screen.getByText('Loading products...')).toBeInTheDocument();
    });

    it('displays products container after loading finishes', async () => {
        (global.fetch as any).mockResolvedValue({
            ok: true,
            json: async () => ({
                id: '1',
                name: 'Test Product',
                price: 9.99,
                reviews: [],
                inStock: true
            })
        });

        render(
            <CartContext.Provider value={mockCartContext}>
                <ProductsPage />
            </CartContext.Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('Our Products')).toBeInTheDocument();
        });
    });

    it('displays products heading', async () => {
        (global.fetch as any).mockResolvedValue({
            ok: true,
            json: async () => ({
                id: '1',
                name: 'Test',
                price: 9.99,
                reviews: [],
                inStock: true
            })
        });

        render(
            <CartContext.Provider value={mockCartContext}>
                <ProductsPage />
            </CartContext.Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('Our Products')).toBeInTheDocument();
        });
    });

    it('throws error when CartContext is undefined', () => {
        (global.fetch as any).mockResolvedValue({
            ok: true,
            json: async () => ({})
        });

        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        expect(() => {
            render(<ProductsPage />);
        }).toThrow('CartContext must be used within a CartProvider');

        consoleErrorSpy.mockRestore();
    });

    it('renders header and footer', async () => {
        (global.fetch as any).mockResolvedValue({
            ok: true,
            json: async () => ({
                id: '1',
                name: 'Test',
                price: 9.99,
                reviews: [],
                inStock: true
            })
        });

        render(
            <CartContext.Provider value={mockCartContext}>
                <ProductsPage />
            </CartContext.Provider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('header')).toBeInTheDocument();
            expect(screen.getByTestId('footer')).toBeInTheDocument();
        });
    });

    it('handles fetch errors gracefully', async () => {
        (global.fetch as any).mockRejectedValue(new Error('Fetch error'));
        
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        render(
            <CartContext.Provider value={mockCartContext}>
                <ProductsPage />
            </CartContext.Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('Our Products')).toBeInTheDocument();
        });

        consoleErrorSpy.mockRestore();
    });
});
