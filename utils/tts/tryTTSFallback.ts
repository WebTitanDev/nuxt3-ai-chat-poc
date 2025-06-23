import { callUnrealSpeech } from './unrealSpeech'
import { callGoogleTTS } from './googleTTS'

export const tryTTSFallback = async (text: string) => {
  const isJapanese = /[\u3000-\u30FF\u4E00-\u9FAF\uFF66-\uFF9D]/.test(text)

  try {
    if (isJapanese) {
	  console.log("japanese--------------")
      return await callGoogleTTS(text)
    } else {
	  console.log("English--------------")
		
      return await callUnrealSpeech(text)
    }
  } catch (err1) {
    console.warn('⚠ Primary TTS failed, trying fallback')
    try {
      return isJapanese ? await callUnrealSpeech(text) : await callGoogleTTS(text)
    } catch {
      return { audioUrl: '', ttsProvider: 'none' }
    }
  }
}

