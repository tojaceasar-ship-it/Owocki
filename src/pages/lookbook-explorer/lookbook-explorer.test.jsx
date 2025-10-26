import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import LookbookExplorer from './index';

// Mock the Sanity client to simulate CMS data fetching
import * as sanity from '../../lib/sanity';
jest.mock('../../lib/sanity', () => ({
  client: {
    fetch: jest.fn(() => Promise.resolve([])),
  },
}));

describe('Lookbook Explorer Page', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <LookbookExplorer />
      </Provider>
    );
  });

  test('renders lookbook explorer page without crashing', () => {
    expect(screen.getByText(/Lookbook Explorer/i)).toBeInTheDocument();
  });

  test('fetches and renders CMS-driven lookbook entries', async () => {
    // Mock CMS data for lookbook entries
    const mockLookbookEntries = [
      { title: 'Summer Vibes', description: 'A collection of summer streetwear looks.', category: 'Seasonal Collection' },
      { title: 'Behind the Scenes', description: 'Exclusive footage from our latest shoot.', category: 'Behind the Scenes' },
    ];
    sanity.client.fetch.mockResolvedValueOnce(mockLookbookEntries);

    render(
      <Provider store={store}>
        <LookbookExplorer />
      </Provider>
    );

    // Check if the CMS data is rendered
    expect(await screen.findByText(/Summer Vibes/i)).toBeInTheDocument();
    expect(await screen.findByText(/Behind the Scenes/i)).toBeInTheDocument();
  });

  test('displays loading state while fetching data', () => {
    // Simulate loading state
    sanity.client.fetch.mockReturnValueOnce(new Promise(() => {})); // Never resolves to simulate loading

    render(
      <Provider store={store}>
        <LookbookExplorer />
      </Provider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test('displays error state if CMS data fetch fails', async () => {
    // Simulate error state
    sanity.client.fetch.mockRejectedValueOnce(new Error('Failed to fetch lookbook data'));

    render(
      <Provider store={store}>
        <LookbookExplorer />
      </Provider>
    );

    expect(await screen.findByText(/Error loading lookbook/i)).toBeInTheDocument();
  });
});
