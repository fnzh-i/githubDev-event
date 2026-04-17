import React, { createContext, useState, ReactNode } from 'react';
import { Product } from '../types';

export interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    incrementQuantity: (productId: string) => void;
    decrementQuantity: (productId: string) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (product: Product) => {
        setCartItems(prevItems => {
            const itemInCart = prevItems.find(item => item.id === product.id);
            if (itemInCart) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const incrementQuantity = (productId: string) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decrementQuantity = (productId: string) => {
        setCartItems(prevItems =>
            prevItems
                .map(item =>
                    item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, incrementQuantity, decrementQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
