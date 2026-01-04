import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { federation } from '@module-federation/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
            federation({
            dev: true,
            name: 'remote_mfe',
            filename: 'remoteEntry.js',

            exposes: {
                './Dashboard': '/src/App.jsx',
            },

            shared: ['react', 'react-dom'],
        }),
  ],
  server: {
    host: true,
    port: 5004,
    cors: true,
  },
})
