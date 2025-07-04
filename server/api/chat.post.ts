import { fetchGroqReply } from '~/utils/fetchGroqReply'
import { tryTTSFallback } from '~/utils/tts/tryTTSFallback'
export default defineEventHandler(async (event) => {
    const { message } = await readBody(event)
    const replyText = await fetchGroqReply(message)
    const { audioUrl, ttsProvider } = await tryTTSFallback(replyText)  
    return { replyText, audioUrl, ttsProvider }
  })
  