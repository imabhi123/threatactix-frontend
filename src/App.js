import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Import AuthContext
import { ThemeProvider } from "./context/ThemeContext"; // Use ThemeProvider instead of ThemeContext
import LoginPage from "./components/Authentication/LoginPage";
import SignUpPage from "./components/Authentication/SignUpPage";
import BlogCard from "./components/BlogCard";
import Navbar from "./components/Header/Navbar";
import ExtremeHeroSection from "./components/HeroSection";
import PricingCard from "./components/PricingCard";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import MalwarePage from "./pages/MalwarePage";
import AttacksPage from "./pages/AttacksPage";
import VictimsPage from "./pages/VictimsPage";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CyberAttackReportPage from "./pages/ThreatFeed";
import ThreatActorsPage from "./pages/ThreatActors";
import UserProfile from "./pages/ProfilePage";
import PromotionBar from "./components/Header/PromotionBar";
import ModernCheckout from "./components/payments/ModernCheckout";
import { useState } from "react";

function App() {
  const [isVisible, setIsVisible] = useState(true);
console.log(isVisible)
  return (
    <AuthProvider>
      <ThemeProvider>
        {" "}
        {/* Use ThemeProvider here */}
        <Router>
          <div className="no_scroll overflow-x-hidden">
            {/* <PromotionBar/> */}
          <Navbar isVisible={isVisible} setIsVisible={setIsVisible} />
            <div className={`relative ${isVisible ? 'top-[104px]' : 'top-[48px]'} px-[4%] md:px-[10%] bg-gray-100 dark:bg-gray-900`}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<ExtremeHeroSection />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/checkout" element={<ModernCheckout />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blog-detail" element={<BlogCard />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/pricing" element={<PricingCard />} />
                <Route path="/malware" element={<MalwarePage />} />
                <Route path="/victims" element={<VictimsPage />} />
                <Route path="/attacks" element={<AttacksPage />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route
                  path="/threat-feed/:id"
                  element={<CyberAttackReportPage />}
                />
                <Route
                  path="/threat-feed"
                  element={<CyberAttackReportPage />}
                />
                <Route path="/threat-actors" element={<ThreatActorsPage />} />
              </Routes>
            </div>
            <Footer isVisible={isVisible} />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

// frontend/src/App.jsx
// App.jsx
// import React from 'react';
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// const App = () => {
//   const initialOptions = {
//     "client-id": "AXqTo3Rw_wnrK8hXEAJnPYJxg_8Ab-bdScpo7xq-UIV6qYbhxNDGq5Ij05mz6jLdZDLbr6ZG_B8HREHF", // Replace with your actual client ID
//     currency: "USD",
//     intent: "capture"
//   };

//   return (
//     <PayPalScriptProvider options={initialOptions}>
//       <div className="App">
//         <h1>PayPal Checkout</h1>
//         <PayPalButtons 
//           createOrder={(data, actions) => {
//             return actions.order.create({
//               purchase_units: [
//                 {
//                   amount: {
//                     value: "99.99",
//                   },
//                 },
//               ],
//             });
//           }}
//           onApprove={(data, actions) => {
//             return actions.order.capture().then((details) => {
//               alert("Transaction completed by " + details.payer.name.given_name);
//             });
//           }}
//         />
//       </div>
//     </PayPalScriptProvider>
//   );
// };

// export default App;