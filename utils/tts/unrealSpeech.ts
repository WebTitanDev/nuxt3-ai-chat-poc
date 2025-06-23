export const callUnrealSpeech = async (text: string) => {
  const config = useRuntimeConfig()
  const apiKey = config.unrealSpeechKey

  // ❗ Use a valid voice — Japanese voices are not currently supported
  const voice = 'Liv' // Valid: Liv, Dan, Will, Scarlett, Amy
  const text1 = "Good morning, this is a test voice message."
  const body = {
    Text: text,
    VoiceId: voice,
    OutputFormat: 'mp3',
    Bitrate: '192k',
    Speed: 1.0
  }

  console.log('▶ Sending to UnrealSpeech:', body)
  console.log('▶ Using API Key:', apiKey)

  const response = await fetch('https://api.v6.unrealspeech.com/speech', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  console.log('🔴 UnrealSpeech Response:', response.statusText,'---------------')

  if (!response.ok) {
    const errorText = await response.text()
    console.error('🔻 UnrealSpeech Error:', errorText)
    throw new Error('UnrealSpeech TTS failed')
  }

  const data = await response.json()
  console.log("lololololo",data)
  return {
    audioUrl: data.OutputUri,
    ttsProvider: 'UnrealSpeech'
  }
}
