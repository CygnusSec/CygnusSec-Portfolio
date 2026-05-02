import { config } from '../config/env';

const Footer = () => (
  <footer className="mt-24 py-8 text-center text-gray-500 text-sm">
    © {new Date().getFullYear()} {config.author.nameEn} — Cyber Security Blog
  </footer>
);

export default Footer;
