import { existsSync, readFileSync } from "fs";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt',],
    pinia: {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
    },
    tailwindcss: {
        config: {
            content: ['./src/**/*.vue'],
        },
        exposeConfig: true
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    vite: {
        vue: {
            script: {
                fs: {
                    fileExists(file) {
                        return existsSync(file);
                    },
                    readFile(file) {
                        return readFileSync(file, "utf-8");
                    },
                },
            },
        },
    },
    devtools: { enabled: true }
});