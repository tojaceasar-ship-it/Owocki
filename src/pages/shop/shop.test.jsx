import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import Shop from './index';

// Mock the Sanity client to simulate CMS data fetching
import * as sanity from '../../lib/sanity';
jest.mock('../../lib/sanity', () => ({
  client: {
    fetch: jest.fn(() => Promise.resolve([])),
  },
}));

describe('Shop Page', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Shop />
      </Provider>
    );
  });

  test('renders shop page without crashing', () => {
    expect(screen.getByText(/Shop/i)).toBeInTheDocument();
  });

  test('fetches and renders CMS-driven product data', async () => {
    // Mock CMS data
    const mockProducts = [
      { name: 'Test Product 1', price: 29.99, category: 'T-shirts' },
      { name: 'Test Product 2', price: 49.99, category: 'Hoodies' },
    ];
    sanity.client.fetch.mockResolvedValueOnce(mockProducts);

    render(
      <Provider store={store}>
        <Shop />
      </Provider>
    );

    // Check if the CMS data is rendered
    expect(await screen.findByText(/Test Product 1/i)).toBeInTheDocument();
    expect(await screen.findByText(/Test Product 2/i)).toBeInTheDocument();
  });

  test('displays loading state while fetching data', () => {
    // Simulate loading state
    sanity.client.fetch.mockReturnValueOnce(new Promise(() => {})); // Never resolves to simulate loading

    render(
      <Provider store={store}>
        <Shop />
      </Provider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test('displays error state if CMS data fetch fails', async () => {
    // Simulate error state
    sanity.client.fetch.mockRejectedValueOnce(new Error('Failed to fetch products'));

    render(
      <Provider store={store}>
        <Shop />
      </Provider>
    );

    expect(await screen.findByText(/Error loading products/i)).toBeInTheDocument();
  });
});

