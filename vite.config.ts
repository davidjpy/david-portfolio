import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import glsl from 'vite-plugin-glsl'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths(), glsl()]
})
