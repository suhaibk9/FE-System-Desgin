import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  const defaultProps = {
    products: Array.from({ length: 50 }, (_, i) => ({ id: i })), // fake products just for truthy checks
    totalPage: 5,
    page: 1,
    setPage: vi.fn(),
    maxVisible: 3,
  };

  it('renders correctly with given pages', () => {
    render(<Pagination {...defaultProps} />);
    
    // Total pages is 5, maxVisible is 3.
    // If we are on page 1, startPage = 1, endPage = 3.
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument(); // Right ellipsis
    expect(screen.getByText('5')).toBeInTheDocument(); // Last page
    expect(screen.queryByText('Prev')).not.toBeInTheDocument(); // Prev shouldn't be here on page 1
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('calls setPage when Next is clicked', () => {
    render(<Pagination {...defaultProps} />);
    fireEvent.click(screen.getByText('Next'));
    expect(defaultProps.setPage).toHaveBeenCalledWith(2);
  });

  it('renders Prev button on page 2 and calls setPage on interaction', () => {
    const props = { ...defaultProps, page: 2 };
    render(<Pagination {...props} />);
    
    const prevBtn = screen.getByText('Prev');
    expect(prevBtn).toBeInTheDocument();
    
    fireEvent.click(prevBtn);
    expect(props.setPage).toHaveBeenCalledWith(1);
  });

  it('calls setPage when a specific page number is clicked', () => {
    render(<Pagination {...defaultProps} />);
    fireEvent.click(screen.getByText('2'));
    expect(defaultProps.setPage).toHaveBeenCalledWith(2);
  });

  it('renders left ellipsis when page is far from start', () => {
    // Current page 4. We should see 1, ..., 3, 4, 5
    const props = { ...defaultProps, page: 4 };
    render(<Pagination {...props} />);

    // We expect the first page
    expect(screen.queryAllByText('1')).toHaveLength(1);
    // and the ellipsis
    expect(screen.getByText('...')).toBeInTheDocument();
    
    // We expect the active window (maxVisible 3, centered on 4 is 3, 4, 5)
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    
    // On page 4, totalPage 5. page < totalPage triggers "Next", so it SHOULD be present.
    expect(screen.getByText('Next')).toBeInTheDocument(); 
  });
});
