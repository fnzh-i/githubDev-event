import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import CartPage from './CartPage';
import { CartContext, CartItem } from '../context/CartContext';

// Mock components
vi.mock('./Header', () => ({
    default: () => <div data-testid="header">Header</div>
}));

vi.mock('./Footer', () => ({
    default: () => <div data-testid="footer">Footer</div>
}));

vi.mock('./CheckoutModal', () => ({
    default: ({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) => (
        <div data-testid="checkout-modal">
            <button onClick={onConfirm} data-testid="confirm-checkout">Confirm</button>
            <button onClick={onCancel} data-testid="cancel-checkout">Cancel</button>
        </div>
    )
}));

const mockCartItems: CartItem[] = [
    {
        id: '1',
        name: 'Test Product 1',
        price: 29.99,
        quantity: 2,
        image: 'test1.jpg',
        reviews: [],
        inStock: true
    },
    {
        id: '2',
        name: 'Test Product 2',
        price: 49.99,
        quantity: 1,
        image: 'test2.jpg',
        reviews: [],
        inStock: true
    }
];

const mockCartContext = {
    cartItems: mockCartItems,
    addToCart: vi.fn(),
    clearCart: vi.fn()
};

const renderWithCartContext = (cartContext = mockCartContext) => {
    return render(
        <CartContext.Provider value={cartContext}>
            <CartPage />
        </CartContext.Provider>
    );
};

describe('CartPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('displays cart items when cart has items', () => {
        renderWithCartContext();
        
        expect(screen.getByText('Your Cart')).toBeInTheDocument();
        expect(screen.getByText('Test Product 1')).toBeInTheDocument();
        expect(screen.getByText('Test Product 2')).toBeInTheDocument();
        expect(screen.getByText('Price: $29.99')).toBeInTheDocument();
        expect(screen.getByText('Price: $49.99')).toBeInTheDocument();
        expect(screen.getByText('Quantity: 2')).toBeInTheDocument();
        expect(screen.getByText('Quantity: 1')).toBeInTheDocument();
    });

    it('displays empty cart message when cart is empty', () => {
        const emptyContext = { ...mockCartContext, cartItems: [] };
        renderWithCartContext(emptyContext);
        
        expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
        expect(screen.queryByText('Checkout')).not.toBeInTheDocument();
    });

    it('renders checkout button when cart has items', () => {
        renderWithCartContext();
        
        expect(screen.getByText('Checkout')).toBeInTheDocument();
    });

    it('opens checkout modal when checkout button is clicked', () => {
        renderWithCartContext();
        
        const checkoutBtn = screen.getByText('Checkout');
        fireEvent.click(checkoutBtn);
        
        expect(screen.getByTestId('checkout-modal')).toBeInTheDocument();
    });

    it('closes checkout modal when cancel button is clicked', () => {
        renderWithCartContext();
        
        const checkoutBtn = screen.getByText('Checkout');
        fireEvent.click(checkoutBtn);
        
        const cancelBtn = screen.getByTestId('cancel-checkout');
        fireEvent.click(cancelBtn);
        
        expect(screen.queryByTestId('checkout-modal')).not.toBeInTheDocument();
    });

    it('displays order processed message after successful checkout', () => {
        renderWithCartContext();
        
        const checkoutBtn = screen.getByText('Checkout');
        fireEvent.click(checkoutBtn);
        
        const confirmBtn = screen.getByTestId('confirm-checkout');
        fireEvent.click(confirmBtn);
        
        expect(screen.getByText('Your order has been processed!')).toBeInTheDocument();
    });

    it('clears cart items after successful checkout', () => {
        renderWithCartContext();
        
        const checkoutBtn = screen.getByText('Checkout');
        fireEvent.click(checkoutBtn);
        
        const confirmBtn = screen.getByTestId('confirm-checkout');
        fireEvent.click(confirmBtn);
        
        expect(mockCartContext.clearCart).toHaveBeenCalled();
    });

    it('displays processed items in order confirmation', () => {
        renderWithCartContext();
        
        const checkoutBtn = screen.getByText('Checkout');
        fireEvent.click(checkoutBtn);
        
        const confirmBtn = screen.getByTestId('confirm-checkout');
        fireEvent.click(confirmBtn);
        
        expect(screen.getByText('Test Product 1')).toBeInTheDocument();
        expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    });

    it('throws error when CartContext is undefined', () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        
        expect(() => {
            render(<CartPage />);
        }).toThrow('CartContext must be used within a CartProvider');
        
        consoleErrorSpy.mockRestore();
    });

    it('renders header and footer components', () => {
        renderWithCartContext();
        
        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });
});
