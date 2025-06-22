import { callUnrealSpeech } from './unrealSpeech'
import { callGoogleTTS } from './googleTTS'

export const tryTTSFallback = async (text: string) => {
  try {
    return await callUnrealSpeech(text)
  } catch {
    try {
      return await callGoogleTTS(text)
    } catch {
      return {
        audioUrl: '',
        ttsProvider: 'none'
      }
    }
  }
}
