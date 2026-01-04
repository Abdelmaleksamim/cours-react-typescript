import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
      federation({
      dev: true,   // IMPORTANT for remoteEntry in dev
      name: 'shell_app',

      remotes: {
        remote_mfe: {
          type: 'module',
          name: 'remote_mfe',
          entry: 'http://localhost:5004/remoteEntry.js',
          shareScope: 'default',
        },
      },

      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],

  server: {
    host: true,
    cors: true,
  },

  build: {
    target: 'chrome89',
  },
})
