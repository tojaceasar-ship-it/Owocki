import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Helmet } from 'react-helmet';

import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';

import Homepage from './pages/homepage';
import CharacterUniverse from './pages/character-universe';
import CommunityGallery from './pages/community-gallery';
import LookbookExplorer from './pages/lookbook-explorer';
import InteractiveExperienceCenter from './pages/interactive-experience-center';
import CreatorSLab from './pages/creator-s-lab';
import CulturalMap from './pages/cultural-map';
import PersonalDashboard from './pages/personal-dashboard';
import KnowledgeHub from './pages/knowledge-hub';
import AdminDashboard from './pages/admin-dashboard';
import Shop from './pages/shop';
import Cart from './pages/shop/cart';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <Helmet>
          <title>Fruits From Da Hood | Premium Streetwear Brand</title>
          <meta name="description" content="Discover premium streetwear with Fruits From Da Hood. Unique designs inspired by urban culture and fruit characters. Shop now for exclusive drops." />
          <meta name="keywords" content="streetwear, urban fashion, fruit characters, premium clothing, exclusive drops, Fruits From Da Hood" />
          <meta property="og:title" content="Fruits From Da Hood | Premium Streetwear Brand" />
          <meta property="og:description" content="Discover premium streetwear with Fruits From Da Hood. Unique designs inspired by urban culture and fruit characters. Shop now for exclusive drops." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://fruitsfromdahood.pl" />
          <meta property="og:image" content="https://fruitsfromdahood.pl/assets/images/og-image.jpg" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Fruits From Da Hood | Premium Streetwear Brand" />
          <meta name="twitter:description" content="Discover premium streetwear with Fruits From Da Hood. Unique designs inspired by urban culture and fruit characters. Shop now for exclusive drops." />
          <meta name="twitter:image" content="https://fruitsfromdahood.pl/assets/images/og-image.jpg" />
          <link rel="canonical" href="https://fruitsfromdahood.pl" />
        </Helmet>
        <ErrorBoundary>
          <Routes>
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/character-universe" element={<CharacterUniverse />} />
            <Route path="/community-gallery" element={<CommunityGallery />} />
            <Route path="/lookbook-explorer" element={<LookbookExplorer />} />
            <Route path="/interactive-experience-center" element={<InteractiveExperienceCenter />} />
            <Route path="/creator-s-lab" element={<CreatorSLab />} />
            <Route path="/cultural-map" element={<CulturalMap />} />
            <Route path="/personal-dashboard" element={<PersonalDashboard />} />
            <Route path="/knowledge-hub" element={<KnowledgeHub />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
