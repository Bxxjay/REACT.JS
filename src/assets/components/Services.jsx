const products = [
  {
    id: 1,
    name: 'Box Braids',
    href: '#',
    price: '₦15,000',
    imageSrc: 'images/boxbraids1.jpg',
    imageSrc2: 'images/boxbraids2.jpg',
    imageAlt: 'Box braids hairstyle.',
  },
  {
    id: 2,
    name: 'Knotless Braids',
    href: '#',
    price: '₦18,000',
    imageSrc: 'images/knotless1.jpg',
    imageSrc2: 'images/knotless2.jpg',
    imageAlt: 'Knotless braids hairstyle.',
  },
  {
    id: 3,
    name: 'Locs',
    href: '#',
    price: '₦20,000',
    imageSrc: 'images/locs1.jpg',
    imageSrc2: 'images/locs2.jpg',
    imageAlt: 'Locs hairstyle.',
  },
  {
    id: 4,
    name: 'Weave',
    href: '#',
    price: '₦25,000',
    imageSrc: 'images/weave1.jpg',
    imageSrc2: 'images/weave2.jpg',
    imageAlt: 'Weave hairstyle.',
  },
  {
    id: 5,
    name: 'Cornrows',
    href: '#',
    price: '₦10,000',
    imageSrc: 'images/cornrows1.jpg',
    imageSrc2: 'images/cornrows2.jpg',
    imageAlt: 'Cornrows hairstyle.',
  },
  {
    id: 6,
    name: 'Twist Out',
    href: '#',
    price: '₦12,000',
    imageSrc: 'images/twistout1.jpg',
    imageSrc2: 'images/twistout2.jpg',
    imageAlt: 'Twist out hairstyle.',
  },
  {
    id: 7,
    name: 'Bantu Knots',
    href: '#',
    price: '₦9,000',
    imageSrc: 'images/bantuknots1.jpg',
    imageSrc2: 'images/bantuknots2.jpg',
    imageAlt: 'Bantu knots hairstyle.',
  },
  {
    id: 8,
    name: 'Faux Locs',
    href: '#',
    price: '₦22,000',
    imageSrc: 'images/fauxlocs1.jpg',
    imageSrc2: 'images/fauxlocs2.jpg',
    imageAlt: 'Faux locs hairstyle.',
  },
];

import { useState } from "react";

export default function Services({ darkMode, onSelectService }) {
  return (
    <div className={`transition-colors duration-300 ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Hairstyles</h1>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              darkMode={darkMode}
              onSelectService={onSelectService}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, darkMode, onSelectService }) {
  const [hovered, setHovered] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    onSelectService({ name: product.name, price: product.price });
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <a href={product.href}
      onClick={handleClick}
      className={`group block rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
        hovered
          ? "border-pink-500 shadow-lg shadow-pink-500/30"
          : darkMode
          ? "border-gray-700"
          : "border-gray-200"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container */}
      <div className="relative aspect-square w-full overflow-hidden">
        <img
          alt={product.imageAlt}
          src={product.imageSrc}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            hovered ? "opacity-0" : "opacity-100"
          }`}
        />
        <img
          alt={product.imageAlt}
          src={product.imageSrc2}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Text */}
      <div className={`p-4 transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
        <h3 className="text-sm font-medium">{product.name}</h3>
        <p className="mt-1 text-lg font-bold text-pink-500">{product.price}</p>
      </div>
    </a>
  );
}