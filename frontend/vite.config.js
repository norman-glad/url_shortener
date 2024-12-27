import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    define: {
      'import.meta.env': process.env,
    },
  };
});
