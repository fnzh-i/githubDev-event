import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import CheckoutModal from './CheckoutModal';

describe('CheckoutModal', () => {
    let mockOnConfirm: ReturnType<typeof vi.fn>;
    let mockOnCancel: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        mockOnConfirm = vi.fn();
        mockOnCancel = vi.fn();
    });

    it('renders confirmation message', () => {
        render(<CheckoutModal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />);
        expect(screen.getByText('Are you sure?')).toBeInTheDocument();
        expect(screen.getByText('Do you want to proceed with the checkout?')).toBeInTheDocument();
    });

    it('renders continue checkout button', () => {
        render(<CheckoutModal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />);
        expect(screen.getByText('Continue Checkout')).toBeInTheDocument();
    });

    it('renders cancel button', () => {
        render(<CheckoutModal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />);
        expect(screen.getByText('Return to cart')).toBeInTheDocument();
    });

    it('calls onConfirm when continue checkout button is clicked', () => {
        render(<CheckoutModal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />);
        
        const confirmBtn = screen.getByText('Continue Checkout');
        fireEvent.click(confirmBtn);
        
        expect(mockOnConfirm).toHaveBeenCalled();
    });

    it('calls onCancel when cancel button is clicked', () => {
        render(<CheckoutModal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />);
        
        const cancelBtn = screen.getByText('Return to cart');
        fireEvent.click(cancelBtn);
        
        expect(mockOnCancel).toHaveBeenCalled();
    });

    it('has modal backdrop and content styling', () => {
        const { container } = render(<CheckoutModal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />);
        
        const backdrop = container.querySelector('.modal-backdrop');
        const modalContent = container.querySelector('.modal-content');
        
        expect(backdrop).toBeInTheDocument();
        expect(modalContent).toBeInTheDocument();
    });

    it('has cancel button with correct class', () => {
        const { container } = render(<CheckoutModal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />);
        
        const cancelBtn = screen.getByText('Return to cart');
        expect(cancelBtn).toHaveClass('cancel-btn');
    });
});
