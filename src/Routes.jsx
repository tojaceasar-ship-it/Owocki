import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes as RouterRoutes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';

const AdminDashboard = lazy(() => import('./pages/admin-dashboard'));
const CulturalMap = lazy(() => import('./pages/cultural-map'));
const CreatorLab = lazy(() => import('./pages/creator-s-lab'));
const InteractiveExperienceCenter = lazy(() => import('./pages/interactive-experience-center'));
const LookbookExplorer = lazy(() => import('./pages/lookbook-explorer'));
const CharacterUniverse = lazy(() => import('./pages/character-universe'));
const CommunityGallery = lazy(() => import('./pages/community-gallery'));
const PersonalDashboard = lazy(() => import('./pages/personal-dashboard'));
const KnowledgeHub = lazy(() => import('./pages/knowledge-hub'));
const Homepage = lazy(() => import('./pages/homepage'));
const Shop = lazy(() => import('./pages/shop'));
const NotFound = lazy(() => import('./pages/NotFound'));

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={
          <Suspense fallback={<div>Loading...</div>}>
            <Homepage />
          </Suspense>
        } />
        <Route path="/admin-dashboard" element={
          <Suspense fallback={<div>Loading...</div>}>
            <AdminDashboard />
          </Suspense>
        } />
        <Route path="/cultural-map" element={
          <Suspense fallback={<div>Loading...</div>}>
            <CulturalMap />
          </Suspense>
        } />
        <Route path="/creator-s-lab" element={
          <Suspense fallback={<div>Loading...</div>}>
            <CreatorLab />
          </Suspense>
        } />
        <Route path="/interactive-experience-center" element={
          <Suspense fallback={<div>Loading...</div>}>
            <InteractiveExperienceCenter />
          </Suspense>
        } />
        <Route path="/lookbook-explorer" element={
          <Suspense fallback={<div>Loading...</div>}>
            <LookbookExplorer />
          </Suspense>
        } />
        <Route path="/character-universe" element={
          <Suspense fallback={<div>Loading...</div>}>
            <CharacterUniverse />
          </Suspense>
        } />
        <Route path="/community-gallery" element={
          <Suspense fallback={<div>Loading...</div>}>
            <CommunityGallery />
          </Suspense>
        } />
        <Route path="/personal-dashboard" element={
          <Suspense fallback={<div>Loading...</div>}>
            <PersonalDashboard />
          </Suspense>
        } />
        <Route path="/knowledge-hub" element={
          <Suspense fallback={<div>Loading...</div>}>
            <KnowledgeHub />
          </Suspense>
        } />
        <Route path="/homepage" element={
          <Suspense fallback={<div>Loading...</div>}>
            <Homepage />
          </Suspense>
        } />
        <Route path="/shop" element={
          <Suspense fallback={<div>Loading...</div>}>
            <Shop />
          </Suspense>
        } />
        <Route path="*" element={
          <Suspense fallback={<div>Loading...</div>}>
            <NotFound />
          </Suspense>
        } />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
