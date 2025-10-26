import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Shop from './index';
import { printfulService } from '../../services/printfulService';

// Mock the printfulService to avoid actual API calls during testing
jest.mock('../../services/printfulService', () => ({
  printfulService: {
    getProducts: jest.fn(() => Promise.resolve({ result: [
      { id: 1, name: 'Test Product 1', thumbnail_url: 'test-url-1', retail_price: 29.99 },
      { id: 2, name: 'Test Product 2', thumbnail_url: 'test-url-2', retail_price: 39.99 }
    ] }))
  }
}));

describe('Shop Page', () => {
  test('renders loading state initially', () => {
    render(<Shop />);
    expect(screen.getByText('Loading products...')).toBeInTheDocument();
  });

  test('renders products after loading', async () => {
    render(<Shop />);
    await waitFor(() => {
      expect(screen.getByText('Shop Fruits From Da Hood')).toBeInTheDocument();
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    });
  });

  test('renders error message on fetch failure', async () => {
    // Override the mock to simulate an error
    printfulService.getProducts.mockImplementation(() => Promise.reject(new Error('Failed to fetch')));
    render(<Shop />);
    await waitFor(() => {
      expect(screen.getByText('Failed to load products. Please try again later.')).toBeInTheDocument();
    });
  });
});
