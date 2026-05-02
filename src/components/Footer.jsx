import { config } from '../config/env';

const Footer = () => (
  <footer className="py-6 text-center text-gray-500 text-sm">
    © {new Date().getFullYear()} {config.author.nameEn} — CygnusSec Blog
  </footer>
);

export default Footer;
