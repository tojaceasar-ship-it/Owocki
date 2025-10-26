import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import CharacterUniverse from './index';

// Mock the Sanity client to simulate CMS data fetching
import * as sanity from '../../lib/sanity';
jest.mock('../../lib/sanity', () => ({
  client: {
    fetch: jest.fn(() => Promise.resolve([])),
  },
}));

describe('Character Universe Page', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <CharacterUniverse />
      </Provider>
    );
  });

  test('renders character universe page without crashing', () => {
    expect(screen.getByText(/Character Universe/i)).toBeInTheDocument();
  });

  test('fetches and renders CMS-driven character data', async () => {
    // Mock CMS data for characters
    const mockCharacters = [
      { name: 'ArbuZiom', description: 'A tough watermelon from the block.', slogan: 'Juicy and tough!', status: 'active' },
      { name: 'Malina Queen', description: 'A sassy raspberry ruling the streets.', slogan: 'Sweet with a bite!', status: 'active' },
    ];
    sanity.client.fetch.mockResolvedValueOnce(mockCharacters);

    render(
      <Provider store={store}>
        <CharacterUniverse />
      </Provider>
    );

    // Check if the CMS data is rendered
    expect(await screen.findByText(/ArbuZiom/i)).toBeInTheDocument();
    expect(await screen.findByText(/Malina Queen/i)).toBeInTheDocument();
  });

  test('displays loading state while fetching data', () => {
    // Simulate loading state
    sanity.client.fetch.mockReturnValueOnce(new Promise(() => {})); // Never resolves to simulate loading

    render(
      <Provider store={store}>
        <CharacterUniverse />
      </Provider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test('displays error state if CMS data fetch fails', async () => {
    // Simulate error state
    sanity.client.fetch.mockRejectedValueOnce(new Error('Failed to fetch character data'));

    render(
      <Provider store={store}>
        <CharacterUniverse />
      </Provider>
    );

    expect(await screen.findByText(/Error loading characters/i)).toBeInTheDocument();
  });
});
