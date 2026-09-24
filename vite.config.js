import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Serve assets from the site root so BrowserRouter deep links such as
  // /project/ids-ips do not resolve them as /project/assets/*.
  base: '/',
});
