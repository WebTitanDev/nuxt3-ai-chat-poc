// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    groqApiKey: process.env.GROQ_API_KEY,
    unrealSpeechKey: process.env.UNREAL_SPEECH_KEY,
    googleTtsKey: process.env.GOOGLE_TTS_KEY,
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
})