import { FaSnapchat, FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer footer-horizontal p-10 bg-black text-white">

      <aside className="flex flex-col gap-2">
        <img
          src="images/Braids 'n' More.png"
          className="h-12 w-auto object-contain mx-auto"
          alt="logo"
        />
        <p>
          &copy; {new Date().getFullYear()} Braids 'n' More
          <br />
          Providing reliable hair services since 2019
        </p>
      </aside>

      <nav className="flex flex-col gap-3">
        <h6 className="font-bold uppercase text-sm tracking-widest"> Reach Out To Us</h6>
        <div className="flex flex-row items-center gap-4">

          <a href="https://snapchat.com/add/yourusername" target="_blank" rel="noopener noreferrer"
            className="text-white hover:text-gray-400 transition-colors duration-300">
            <FaSnapchat size={24} />
          </a>

          <a href="https://instagram.com/yourhandle" target="_blank" rel="noopener noreferrer"
            className="text-white hover:text-gray-400 transition-colors duration-300">
            <FaInstagram size={24} />
          </a>

          <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer"
            className="text-white hover:text-gray-400 transition-colors duration-300">
            <FaFacebook size={24} />
          </a>

          <a href="https://wa.me/2348012345678" target="_blank" rel="noopener noreferrer"
            className="text-white hover:text-gray-400 transition-colors duration-300">
            <FaWhatsapp size={24} />
          </a>

        </div>
      </nav>

    </footer>
  );
}