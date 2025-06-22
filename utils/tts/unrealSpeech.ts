export const callUnrealSpeech = async (text: string) => {
    const config = useRuntimeConfig()
    const apiKey = config.unrealSpeechKey
  
    const voice = 'ai1-JpFemale1' // Example Japanese voice (you may need to verify this voice exists)
    const response = await fetch('https://api.v6.unrealspeech.com/speech', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Text: text,
        VoiceId: voice,
        OutputFormat: 'mp3',
        Bitrate: '192k',
        Speed: 1.0
      })
    })
  
    if (!response.ok) {
      throw new Error('UnrealSpeech TTS failed')
    }
  
    const data = await response.json()
    return {
      audioUrl: data.Url,
      ttsProvider: 'UnrealSpeech'
    }
  }
  