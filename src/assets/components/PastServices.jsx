import { useEffect, useRef } from "react";

const BASE = import.meta.env.BASE_URL;

const images = [
  `${BASE}images/WhatsApp Image 2026-04-24 at 22.16.46 (1).jpeg`,
  `${BASE}images/WhatsApp Image 2026-04-24 at 22.16.46.jpeg`,
  `${BASE}images/WhatsApp Image 2026-04-24 at 22.16.50.jpeg`,
  `${BASE}images/WhatsApp Image 2026-04-24 at 22.16.52.jpeg`,
  `${BASE}images/WhatsApp Image 2026-04-24 at 22.16.53.jpeg`,
  `${BASE}images/WhatsApp Image 2026-04-24 at 22.16.59.jpeg`,
  `${BASE}images/WhatsApp Image 2026-04-24 at 22.17.13 (1).jpeg`,
];

export default function CarouselSection({ darkMode }) {
  const carouselRef = useRef(null);
  const currentIndex = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const carousel = carouselRef.current;
      if (!carousel) return;

      const itemWidth = carousel.offsetWidth;
      currentIndex.current = (currentIndex.current + 1) % images.length;

      carousel.scrollTo({
        left: itemWidth * currentIndex.current,
        behavior: "smooth",
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className={`text-center py-6 ${darkMode ? "bg-black" : "bg-gray-100"}`}>
        <h1 className="text-3xl font-bold text-center text-pink-500">Customer's Cam</h1>
      </div>
      <section
        className={`w-full px-10 py-16 transition-colors duration-300 ${
          darkMode ? "bg-black text-white" : "bg-gray-100 text-black"
        }`}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-stretch gap-10">

          {/* Carousel */}
          <div
            ref={carouselRef}
            className="w-full md:w-3/5 flex-shrink-0 overflow-x-hidden flex flex-row rounded-2xl h-[400px]"
          >
            {images.map((src, index) => (
              <div key={index} className="min-w-full flex-shrink-0 h-full">
                <img
                  src={src}
                  className="w-full h-full object-cover object-center"
                  alt={`Slide ${index + 1}`}
                />
              </div>
            ))}
          </div>

          {/* Text */}
          <div className="w-full md:w-2/5 flex flex-col justify-center gap-4">
            <h2 className="text-3xl font-bold">Where Every Cut Tells a Story</h2>
            <p className="text-base leading-relaxed opacity-80">
              At our studio, we believe that great hair is more than just a style —
              it's an expression of who you are. Our skilled stylists bring years of
              experience and a passion for precision to every appointment, whether
              you're after a bold new look or a classic trim.
            </p>
            <p className="text-base leading-relaxed opacity-80">
              We use only the finest products to nourish and protect your hair,
              ensuring every visit leaves you feeling confident and refreshed.
              From cuts and colours to treatments and styling, we offer a full
              range of services tailored to your unique needs.
            </p>
            <p className="text-base leading-relaxed opacity-80">
              Step into a space where creativity meets care. Your hair deserves
              nothing less than the best — and that's exactly what we deliver,
              every single time.
            </p>
          </div>

        </div>
      </section>
    </>
  );
}