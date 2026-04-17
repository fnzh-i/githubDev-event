import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import React, { useContext } from 'react';
import { CartProvider, CartContext, CartItem } from './CartContext';
import { Product } from '../types';

const TestComponent = () => {
    const context = useContext(CartContext);
    if (!context) {
        return <div>No context</div>;
    }

    const { cartItems, addToCart, clearCart } = context;

    const testProduct: Product = {
        id: '1',
        name: 'Test Product',
        price: 29.99,
        description: 'A test product',
        image: 'test.jpg',
        reviews: [],
        inStock: true
    };

    const testProduct2: Product = {
        id: '2',
        name: 'Test Product 2',
        price: 49.99,
        description: 'Another test product',
        image: 'test2.jpg',
        reviews: [],
        inStock: true
    };

    return (
        <div>
            <button onClick={() => addToCart(testProduct)} data-testid="add-product-1">
                Add Product 1
            </button>
            <button onClick={() => addToCart(testProduct2)} data-testid="add-product-2">
                Add Product 2
            </button>
            <button onClick={clearCart} data-testid="clear-cart">
                Clear Cart
            </button>
            <div data-testid="cart-items-count">
                {cartItems.length} items in cart
            </div>
            {cartItems.map((item) => (
                <div key={item.id} data-testid={`cart-item-${item.id}`}>
                    <span>{item.name}</span>
                    <span>{item.quantity}</span>
                </div>
            ))}
        </div>
    );
};

describe('CartContext', () => {
    beforeEach(() => {
        // Clear any state before each test
    });

    it('provides initial empty cart', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        expect(screen.getByText('0 items in cart')).toBeInTheDocument();
    });

    it('adds a product to cart', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        const addBtn = screen.getByTestId('add-product-1');
        fireEvent.click(addBtn);

        expect(screen.getByText('1 items in cart')).toBeInTheDocument();
        expect(screen.getByText('Test Product')).toBeInTheDocument();
    });

    it('increments quantity when adding existing product', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        const addBtn = screen.getByTestId('add-product-1');
        fireEvent.click(addBtn);
        fireEvent.click(addBtn);

        expect(screen.getByText('1 items in cart')).toBeInTheDocument();
        const quantity = screen.getAllByText('2')[0];
        expect(quantity).toBeInTheDocument();
    });

    it('adds multiple different products to cart', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        const addBtn1 = screen.getByTestId('add-product-1');
        const addBtn2 = screen.getByTestId('add-product-2');

        fireEvent.click(addBtn1);
        fireEvent.click(addBtn2);

        expect(screen.getByText('2 items in cart')).toBeInTheDocument();
        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    });

    it('clears the cart', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        const addBtn = screen.getByTestId('add-product-1');
        const clearBtn = screen.getByTestId('clear-cart');

        fireEvent.click(addBtn);
        expect(screen.getByText('1 items in cart')).toBeInTheDocument();

        fireEvent.click(clearBtn);
        expect(screen.getByText('0 items in cart')).toBeInTheDocument();
    });

    it('provides CartContext.Provider to children', () => {
        const { container } = render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        expect(screen.getByText(/items in cart/)).toBeInTheDocument();
    });

    it('maintains cart state across multiple operations', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        const addBtn1 = screen.getByTestId('add-product-1');
        const addBtn2 = screen.getByTestId('add-product-2');

        // Add first product twice
        fireEvent.click(addBtn1);
        fireEvent.click(addBtn1);
        expect(screen.getByText('1 items in cart')).toBeInTheDocument();

        // Add second product
        fireEvent.click(addBtn2);
        expect(screen.getByText('2 items in cart')).toBeInTheDocument();

        // Verify quantities
        const quantities = screen.getAllByText('2');
        expect(quantities.length).toBeGreaterThan(0);
    });

    it('preserves product properties when adding to cart', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        const addBtn = screen.getByTestId('add-product-1');
        fireEvent.click(addBtn);

        const cartItem = screen.getByTestId('cart-item-1');
        expect(cartItem).toBeInTheDocument();
    });
});
