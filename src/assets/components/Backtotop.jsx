import { useState, useEffect } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "40px",
          right: "40px",
          padding: "15px 15px",
          fontSize: "16px",
          backgroundColor: "pink",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "50%",
        }}
      >
        ↑ 
      </button>
    )
  );
}