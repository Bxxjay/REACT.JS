import { useState, useEffect } from "react";
import Navbar from "../src/assets/components/Navbar";
import BackToTop from "../src/assets/components/Backtotop";
import CookieConsent from "../src/assets/components/Cookieconsent";
import Example from "../src/assets/components/Stats";
import CursorMaskReveal from "../src/assets/components/CustomHover";
import Footer from "../src/assets/components/Footer";
import CarouselSection from "../src/assets/components/PastServices";
import About from "../src/assets/components/About";
import Products from "../src/assets/components/Services";
import Page from "../src/assets/components/Page";
import FAQSection from "../src/assets/components/FAQ";
export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") setDarkMode(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Example darkMode={darkMode} />
      <CursorMaskReveal
  foregroundImage={`${import.meta.env.BASE_URL}images/abhishek-ravi-qi2-ePRjgGw-unsplash.jpg`}
  backgroundImage={`${import.meta.env.BASE_URL}images/wolfgang-hasselmann-lLemmyQyC_w-unsplash.jpg`}
  overlayColor="rgba(0,0,0,0.6)"
  maskSize={350}
/>
      <About darkMode={darkMode} />
      <Products darkMode={darkMode} onSelectService={setSelectedService}/>
      <CarouselSection darkMode={darkMode} />
      <Page darkMode={darkMode} selectedService={selectedService} />
      <BackToTop />
      <CookieConsent />
      <FAQSection darkMode={darkMode} />
      <Footer />
    </>
  );
}