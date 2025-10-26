import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import Homepage from './index';

// Mock the Sanity client to simulate CMS data fetching
import * as sanity from '../../lib/sanity';
jest.mock('../../lib/sanity', () => ({
  client: {
    fetch: jest.fn(() => Promise.resolve([])),
  },
}));

describe('Homepage', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Homepage />
      </Provider>
    );
  });

  test('renders homepage without crashing', () => {
    expect(screen.getByText(/Fruits From Da Hood/i)).toBeInTheDocument();
  });

  test('fetches and renders CMS-driven hero slides', async () => {
    // Mock CMS data for hero slides
    const mockHeroSlides = [
      { id: 1, title: 'Welcome to the Hood', subtitle: 'Join the Movement', description: 'Discover streetwear with attitude.', imageUrl: 'test-url-1', cta: 'Shop Now', ctaLink: '/shop' },
      { id: 2, title: 'Meet the Crew', subtitle: 'Fruit Characters', description: 'Each with a unique story.', imageUrl: 'test-url-2', cta: 'Meet Them', ctaLink: '/character-universe' },
    ];
    sanity.client.fetch.mockResolvedValueOnce(mockHeroSlides);

    render(
      <Provider store={store}>
        <Homepage />
      </Provider>
    );

    // Check if the CMS data is rendered
    expect(await screen.findByText(/Welcome to the Hood/i)).toBeInTheDocument();
    expect(await screen.findByText(/Meet the Crew/i)).toBeInTheDocument();
  });

  test('displays loading state while fetching data', () => {
    // Simulate loading state
    sanity.client.fetch.mockReturnValueOnce(new Promise(() => {})); // Never resolves to simulate loading

    render(
      <Provider store={store}>
        <Homepage />
      </Provider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test('displays error state if CMS data fetch fails', async () => {
    // Simulate error state
    sanity.client.fetch.mockRejectedValueOnce(new Error('Failed to fetch homepage content'));

    render(
      <Provider store={store}>
        <Homepage />
      </Provider>
    );

    expect(await screen.findByText(/Error loading content/i)).toBeInTheDocument();
  });
});
