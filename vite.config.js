import { defineConfig } from 'vite'

export default defineConfig({
    server: {
        // Allows all hosts, including localtunnel urls
        allowedHosts: true
    },
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                campaign: 'campaign.html'
            }
        }
    }
})
