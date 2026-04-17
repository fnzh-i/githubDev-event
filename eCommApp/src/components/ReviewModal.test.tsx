import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import ReviewModal from './ReviewModal';
import { Product, Review } from '../types';

describe('ReviewModal', () => {
    let mockOnClose: ReturnType<typeof vi.fn>;
    let mockOnSubmit: ReturnType<typeof vi.fn>;
    let mockProduct: Product;

    beforeEach(() => {
        mockOnClose = vi.fn();
        mockOnSubmit = vi.fn();
        mockProduct = {
            id: '1',
            name: 'Test Product',
            price: 9.99,
            description: 'A test product',
            image: 'test.jpg',
            reviews: [
                {
                    author: 'John',
                    comment: 'Great product!',
                    date: '2025-01-01T00:00:00Z'
                }
            ],
            inStock: true
        };
    });

    it('returns null when product is null', () => {
        const { container } = render(
            <ReviewModal product={null} onClose={mockOnClose} onSubmit={mockOnSubmit} />
        );
        expect(container.firstChild).toBeNull();
    });

    it('displays product name in title', () => {
        render(
            <ReviewModal product={mockProduct} onClose={mockOnClose} onSubmit={mockOnSubmit} />
        );
        expect(screen.getByText('Reviews for Test Product')).toBeInTheDocument();
    });

    it('displays existing reviews', () => {
        render(
            <ReviewModal product={mockProduct} onClose={mockOnClose} onSubmit={mockOnSubmit} />
        );
        expect(screen.getByText('John')).toBeInTheDocument();
        expect(screen.getByText('Great product!')).toBeInTheDocument();
    });

    it('displays no reviews message when there are no reviews', () => {
        mockProduct.reviews = [];
        render(
            <ReviewModal product={mockProduct} onClose={mockOnClose} onSubmit={mockOnSubmit} />
        );
        expect(screen.getByText('No reviews yet.')).toBeInTheDocument();
    });

    it('renders review form with author and comment fields', () => {
        render(
            <ReviewModal product={mockProduct} onClose={mockOnClose} onSubmit={mockOnSubmit} />
        );
        expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Your review')).toBeInTheDocument();
    });

    it('renders submit button', () => {
        render(
            <ReviewModal product={mockProduct} onClose={mockOnClose} onSubmit={mockOnSubmit} />
        );
        expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    it('renders close button', () => {
        render(
            <ReviewModal product={mockProduct} onClose={mockOnClose} onSubmit={mockOnSubmit} />
        );
        expect(screen.getByText('Close')).toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', () => {
        render(
            <ReviewModal product={mockProduct} onClose={mockOnClose} onSubmit={mockOnSubmit} />
        );
        
        const closeBtn = screen.getByText('Close');
        fireEvent.click(closeBtn);
        
        expect(mockOnClose).toHaveBeenCalled();
    });

    it('calls onClose when backdrop is clicked', () => {
        const { container } = render(
            <ReviewModal product={mockProduct} onClose={mockOnClose} onSubmit={mockOnSubmit} />
        );
        
        const backdrop = container.querySelector('.modal-backdrop');
        fireEvent.click(backdrop!);
        
        expect(mockOnClose).toHaveBeenCalled();
    });

    it('does not close when modal content is clicked', () => {
        const { container } = render(
            <ReviewModal product={mockProduct} onClose={mockOnClose} onSubmit={mockOnSubmit} />
        );
        
        const modalContent = container.querySelector('.modal-content');
        fireEvent.click(modalContent!);
        
        expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('submits review with form data', () => {
        render(
            <ReviewModal product={mockProduct} onClose={mockOnClose} onSubmit={mockOnSubmit} />
        );
        
        const authorInput = screen.getByPlaceholderText('Your name') as HTMLInputElement;
        const commentInput = screen.getByPlaceholderText('Your review') as HTMLTextAreaElement;
        const submitBtn = screen.getByText('Submit');
        
        fireEvent.change(authorInput, { target: { value: 'Jane' } });
        fireEvent.change(commentInput, { target: { value: 'Excellent!' } });
        fireEvent.click(submitBtn);
        
        expect(mockOnSubmit).toHaveBeenCalledWith(
            expect.objectContaining({
                author: 'Jane',
                comment: 'Excellent!'
            })
        );
    });

    it('resets form after submission', () => {
        render(
            <ReviewModal product={mockProduct} onClose={mockOnClose} onSubmit={mockOnSubmit} />
        );
        
        const authorInput = screen.getByPlaceholderText('Your name') as HTMLInputElement;
        const commentInput = screen.getByPlaceholderText('Your review') as HTMLTextAreaElement;
        const submitBtn = screen.getByText('Submit');
        
        fireEvent.change(authorInput, { target: { value: 'Jane' } });
        fireEvent.change(commentInput, { target: { value: 'Excellent!' } });
        fireEvent.click(submitBtn);
        
        expect(authorInput.value).toBe('');
        expect(commentInput.value).toBe('');
    });
});
