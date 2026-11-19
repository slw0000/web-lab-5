export default defineNuxtConfig({
    modules: ['@pinia/nuxt'],
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    css: ['~/assets/styles/main.css'],

    runtimeConfig: {
        javaApiBaseUrl: 'http://localhost:8080/api',
        public: {
            apiBaseUrl: '/api',
            studentsRefreshMs: 30000,
            studentsPageSize: 10,
        },
    },

    nitro: {
        preset: 'node-server',
    },
});
