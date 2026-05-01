import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user already accepted cookies
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowBanner(false);
  };

  return (
    showBanner && (
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          backgroundColor: "#FF1493",
          color: "white",
          padding: "15px",
          textAlign: "center",
          zIndex: 1000,
        }}
      >
        <p style={{ margin: "0 0 10px 0" }}>
          This website uses cookies to improve your experience. By continuing,
          you agree to our use of cookies.
        </p>
        <button
          onClick={acceptCookies}
          style={{
            padding: "8px 16px",
            backgroundColor: "white",
            color: "#FF1493",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Accept
        </button>
      </div>
    )
  );
}