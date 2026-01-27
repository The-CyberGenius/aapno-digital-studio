import { defineConfig } from 'vite'

export default defineConfig({
    server: {
        // Allows all hosts, including localtunnel urls
        allowedHosts: true
    }
})
