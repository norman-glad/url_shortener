import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'; 



export default defineConfig(({ mode }) => {
  const env = dotenv.config().parsed; 
  // Make the environment variables available to the application
  return {
    plugins: [react()],
    define: {
      'process.env': env,
    },
  };
});