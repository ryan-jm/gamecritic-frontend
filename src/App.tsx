import './styles/globals.scss';
import '@elastic/eui/dist/eui_theme_dark.css';

import { EuiProvider } from '@elastic/eui';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Error from './pages/Error';
import Home from './pages/Home';
import IndividualReview from './pages/IndividualReview';
import Login from './pages/Login';
import Reviews from './pages/Reviews';
import { AuthProvider } from './stores/AuthContext';

function App() {
  return (
    <div className="App">
      <EuiProvider colorMode="dark">
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Error />} />
            <Route path="/reviews">
              <Route index element={<Reviews />} />
              <Route path=":review_id" element={<IndividualReview />} />
            </Route>
          </Routes>
        </AuthProvider>
      </EuiProvider>
    </div>
  );
}

export default App;
