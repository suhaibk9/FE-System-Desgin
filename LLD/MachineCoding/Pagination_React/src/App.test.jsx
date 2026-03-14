/* global beforeAll */
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';

// Mock fetch API globally
beforeAll(() => {
  vi.stubGlobal('fetch', vi.fn());
});

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches products and renders them', async () => {
    const mockProducts = {
      products: [
        { id: 1, title: 'Test Product 1', thumbnail: 'test1.jpg' },
        { id: 2, title: 'Test Product 2', thumbnail: 'test2.jpg' },
      ],
      total: 20,
    };

    fetch.mockResolvedValueOnce({
      json: async () => mockProducts,
    });

    render(<App />);

    // Wait for the products to be rendered
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    });

    // We have 20 total products and pageSize is 10. Thus total pages = 2.
    // Ensure pagination rendered correctly. We expect page 1, 2, and "Next"
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('handles empty product list correctly', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ products: [], total: 0 }),
    });

    const { container } = render(<App />);

    await waitFor(() => {
      // Pagination shouldn't render if it's empty
      expect(container.querySelector('.pagination')).not.toBeInTheDocument();
    });
  });
});
