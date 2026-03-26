import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Shipping from './pages/Shipping';
import PlaceOrder from './pages/PlaceOrder';
import TryOn from './pages/TryOn';
import Customizer from './pages/Customizer';
import ZoomLab from './pages/ZoomLab';
import FabricQuiz from './pages/FabricQuiz';
import RoomVisualizer from './pages/RoomVisualizer';
import Moodboard from './pages/Moodboard';
import ARPreview from './pages/ARPreview';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-brand-cream cursor-none">
            <CustomCursor />
            <Navbar />
            <main className="flex-grow pt-20">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<AdminDashboard />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/placeorder" element={<PlaceOrder />} />
              <Route path="/studio/try-on" element={<TryOn />} />
              <Route path="/studio/customizer" element={<Customizer />} />
              <Route path="/studio/zoom" element={<ZoomLab />} />
              <Route path="/studio/quiz" element={<FabricQuiz />} />
              <Route path="/studio/room" element={<RoomVisualizer />} />
              <Route path="/studio/moodboard" element={<Moodboard />} />
              <Route path="/studio/ar" element={<ARPreview />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
