import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';

describe('Footer', () => {
    it('displays copyright information', () => {
        render(<Footer />);
        expect(screen.getByText('© 2025 The Daily Harvest. All rights reserved.')).toBeInTheDocument();
    });

    it('renders in a footer element', () => {
        const { container } = render(<Footer />);
        const footer = container.querySelector('footer');
        expect(footer).toBeInTheDocument();
    });

    it('has correct footer class', () => {
        const { container } = render(<Footer />);
        const footer = container.querySelector('footer.app-footer');
        expect(footer).toBeInTheDocument();
    });
});
