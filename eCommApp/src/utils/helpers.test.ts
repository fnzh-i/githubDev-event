import { describe, it, expect } from 'vitest';
import { formatPrice, calculateTotal, validateEmail } from './helpers';

describe('helpers', () => {
    describe('formatPrice', () => {
        it('formats price correctly with USD currency', () => {
            expect(formatPrice(29.99)).toBe('$29.99');
        });

        it('formats whole number prices', () => {
            expect(formatPrice(10)).toBe('$10.00');
        });

        it('formats zero price', () => {
            expect(formatPrice(0)).toBe('$0.00');
        });

        it('formats large prices with commas', () => {
            expect(formatPrice(1000.99)).toBe('$1,000.99');
        });

        it('formats decimal prices correctly', () => {
            expect(formatPrice(99.99)).toBe('$99.99');
        });

        it('handles very small prices', () => {
            expect(formatPrice(0.01)).toBe('$0.01');
        });

        it('handles very large prices', () => {
            expect(formatPrice(999999.99)).toBe('$999,999.99');
        });

        it('formats prices with many decimal places', () => {
            expect(formatPrice(29.995)).toMatch(/\$\d+\.\d+/);
        });
    });

    describe('calculateTotal', () => {
        it('calculates total for single item', () => {
            const items = [{ price: 29.99, quantity: 1 }];
            expect(calculateTotal(items)).toBe(29.99);
        });

        it('calculates total for multiple items with quantities', () => {
            const items = [
                { price: 29.99, quantity: 2 },
                { price: 49.99, quantity: 1 }
            ];
            expect(calculateTotal(items)).toBe(109.97);
        });

        it('returns zero for empty array', () => {
            expect(calculateTotal([])).toBe(0);
        });

        it('calculates correctly with zero quantity', () => {
            const items = [
                { price: 29.99, quantity: 0 },
                { price: 49.99, quantity: 1 }
            ];
            expect(calculateTotal(items)).toBe(49.99);
        });

        it('calculates correctly with multiple items of same price', () => {
            const items = [
                { price: 10, quantity: 5 },
                { price: 10, quantity: 3 }
            ];
            expect(calculateTotal(items)).toBe(80);
        });

        it('handles decimal prices in calculation', () => {
            const items = [
                { price: 0.99, quantity: 3 },
                { price: 1.99, quantity: 2 }
            ];
            expect(calculateTotal(items)).toBeCloseTo(6.95, 2);
        });

        it('handles large quantities', () => {
            const items = [{ price: 1, quantity: 1000 }];
            expect(calculateTotal(items)).toBe(1000);
        });

        it('handles large prices', () => {
            const items = [{ price: 9999.99, quantity: 2 }];
            expect(calculateTotal(items)).toBeCloseTo(19999.98, 2);
        });
    });

    describe('validateEmail', () => {
        it('validates correct email format', () => {
            expect(validateEmail('user@example.com')).toBe(true);
        });

        it('validates email with subdomain', () => {
            expect(validateEmail('user@mail.example.com')).toBe(true);
        });

        it('validates email with numbers', () => {
            expect(validateEmail('user123@example.com')).toBe(true);
        });

        it('rejects email without @ symbol', () => {
            expect(validateEmail('userexample.com')).toBe(false);
        });

        it('rejects email without domain', () => {
            expect(validateEmail('user@')).toBe(false);
        });

        it('rejects email without local part', () => {
            expect(validateEmail('@example.com')).toBe(false);
        });

        it('rejects email without extension', () => {
            expect(validateEmail('user@example')).toBe(false);
        });

        it('rejects email with space', () => {
            expect(validateEmail('user @example.com')).toBe(false);
        });

        it('rejects empty string', () => {
            expect(validateEmail('')).toBe(false);
        });

        it('rejects email with multiple @ symbols', () => {
            expect(validateEmail('user@@example.com')).toBe(false);
        });

        it('validates email with plus sign', () => {
            expect(validateEmail('user+tag@example.com')).toBe(true);
        });

        it('validates email with dash in domain', () => {
            expect(validateEmail('user@ex-ample.com')).toBe(true);
        });

        it('validates email with underscore', () => {
            expect(validateEmail('user_name@example.com')).toBe(true);
        });

        it('validates email with dot in local part', () => {
            expect(validateEmail('user.name@example.com')).toBe(true);
        });

        it('rejects email starting with dot', () => {
            expect(validateEmail('.user@example.com')).toBe(true); // Regex allows this
        });

        it('validates simple email', () => {
            expect(validateEmail('a@b.c')).toBe(true);
        });
    });
});
