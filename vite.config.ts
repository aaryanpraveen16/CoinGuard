import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vite.dev/config/
// export default defineConfig({
//   optimizeDeps: {
//     esbuildOptions: {
//         // Node.js global to browser globalThis
//         define: {
//             global: 'globalThis'
//         },
//   plugins: [
//     NodeGlobalsPolyfillPlugin({
//       buffer: true
//   })
//   ],
// }
//   }
// })
export default defineConfig({
  plugins: [react(), nodePolyfills()],
})