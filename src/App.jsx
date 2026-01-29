import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import { CurrencyProvider } from "./contexts/CurrencyContext";

import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs"

export default function App() {
  return (
    <CurrencyProvider>
      <BrowserRouter basename={(import.meta.env.BASE_URL || "/").replace(/\/$/, "") || "/"}>
        <ScrollToTop />
        <Navbar />
        <div className="pt-16 md:pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />}/>
        </Routes>
        </div>
      </BrowserRouter>
    </CurrencyProvider>
  );
}
