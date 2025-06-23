export const callGoogleTTS = async (text: string) => {
  const config = useRuntimeConfig()
  const apiKey = config.googleTtsKey

  const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      input: { text },
      voice: {
        languageCode: 'ja-JP',
        name: 'ja-JP-Wavenet-A' // Natural-sounding Japanese voice
      },
      audioConfig: {
        audioEncoding: 'MP3',
        speakingRate: 1.0
      }
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('🔻 Google TTS error:', errorText)
    throw new Error('Google TTS failed')
  }

  const result = await response.json()

  return {
    audioUrl: `data:audio/mp3;base64,${result.audioContent}`,
    ttsProvider: 'GoogleTTS'
  }
}
