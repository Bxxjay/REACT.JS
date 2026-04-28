'use client'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/' },
  { name: 'Services', href: '#' },
  { name: 'Book An Appointment', href: '/' },
]

export default function Navbar({ darkMode, setDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8">

          {/* LOGO */}
          <div className="flex lg:flex-1">
            <Link to="/">
              <img
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg"
                className={`h-8 w-auto ${darkMode ? "invert" : "brightness-0"}`}
                alt="logo"
              />
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <div className="flex lg:hidden">
            <button onClick={() => setMobileMenuOpen(true)}>
              <Bars3Icon className={`h-6 w-6 ${darkMode ? "text-white" : "text-black"}`} />
            </button>
          </div>

          {/* NAV */}
          <div className="hidden lg:flex lg:gap-x-12 relative">
            {navigation.map((item) =>
              item.name === "Services" ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <span
                    className={`cursor-pointer font-semibold hover:text-pink-500 transition-colors duration-200 ${darkMode ? "text-white" : "text-black"}`}
                    onClick={() => setServicesOpen(!servicesOpen)}
                  >
                    Services
                  </span>

                  {/* DROPDOWN */}
                  <div className="absolute top-full left-0 pt-2 w-52">
                    <div className={`rounded-lg shadow-lg p-4 space-y-2 transition-all duration-300 ${
                      servicesOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
                    } ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
                      <Link to="/works" className="block hover:text-pink-500 transition-colors duration-200">Previous Works</Link>
                      <Link to="/hairstyles" className="block hover:text-pink-500 transition-colors duration-200">Hairstyles</Link>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-semibold hover:text-pink-500 transition-colors duration-200 ${darkMode ? "text-white" : "text-black"}`}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          {/* THEME TOGGLE */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? (
                <SunIcon className="h-6 w-6 text-white hover:text-pink-400 transition-colors duration-200" />
              ) : (
                <MoonIcon className="h-6 w-6 text-black hover:text-pink-500 transition-colors duration-200" />
              )}
            </button>
          </div>

        </nav>

        {/* MOBILE MENU */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <Dialog.Panel className={`fixed inset-y-0 right-0 w-full p-6 ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>

            <div className="flex justify-between items-center">
              <span>Menu</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <XMarkIcon className={`h-6 w-6 ${darkMode ? "text-white" : "text-black"}`} />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {navigation.map((item) =>
                item.name === "Services" ? (
                  <div key={item.name}>
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className={`font-semibold hover:text-pink-500 transition-colors duration-200 ${darkMode ? "text-white" : "text-black"}`}
                    >
                      Services
                    </button>

                    {servicesOpen && (
                      <div className="ml-4 mt-2 space-y-2">
                        <Link to="/works" className={`block hover:text-pink-500 transition-colors duration-200 ${darkMode ? "text-white" : "text-black"}`}>Previous Works</Link>
                        <Link to="/booking" className={`block hover:text-pink-500 transition-colors duration-200 ${darkMode ? "text-white" : "text-black"}`}>Book Appointment</Link>
                        <Link to="/hairstyles" className={`block hover:text-pink-500 transition-colors duration-200 ${darkMode ? "text-white" : "text-black"}`}>Hairstyles</Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block hover:text-pink-500 transition-colors duration-200 ${darkMode ? "text-white" : "text-black"}`}
                  >
                    {item.name}
                  </Link>
                )
              )}

              {/* THEME TOGGLE IN MOBILE */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`mt-6 hover:text-pink-500 transition-colors duration-200 ${darkMode ? "text-white" : "text-black"}`}
              >
                Change Theme
              </button>
            </div>

          </Dialog.Panel>
        </Dialog>
      </header>

     {/* HERO */}
<div className="relative min-h-screen bg-[url('/images/microsoft-copilot-71ig274jGpw-unsplash.jpg')] bg-cover bg-center">
  <div className='absolute inset-0 bg-black/50'></div>
  <div className="relative px-6 pt-24 pb-16 flex flex-col items-center min-h-screen text-white">

    <div className="relative px-6 pt-24 pb-16 flex flex-col items-center justify-center min-h-screen text-white gap-16">

  {/* Top text */}
  <div className="text-center -mt-42">
    <h1 className="text-5xl font-semibold sm:text-7xl">
      Data to enrich your online business
    </h1>
    <p className="mt-6 text-gray-400">
      Clean UI. Smooth experience. Scalable design.
    </p>
  </div>

  {/* Bottom button */}
  <div className="absolute bottom-26">
    <Link to="/booking">
      <button className="bg-white text-pink-500 font-semibold px-8 py-4 rounded-full hover:bg-pink-50 hover:scale-105 transition-all duration-300 shadow-lg text-base">
        Book Us Now →
      </button>
    </Link>
  </div>

  </div>

  </div>
</div>
    </>
  )
}