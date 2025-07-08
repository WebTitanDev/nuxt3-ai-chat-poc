export const callUnrealSpeech = async (text: string) => {
  const config = useRuntimeConfig()
  const apiKey = config.unrealSpeechKey

  const voice = 'Edward' // Allowed VoiceIds: Eleanor, Melody, Javier, Amelia, Sheng, Lian, Jasper, Lauren, Luna, Sierra, af, Edward, Charlotte, Caleb, Priya, Wei, Ting, Sakura, Chloe, Noah, Rina, Kaitlyn, Luca, Emily, Jing, Rowan, Hana, Benjamin, Maddie, Ronan, Mateo, Autumn, Arthur, Willow, Daniel, Lucía, Rafael, Oliver, Yuki, Rohan, Jian, Arjun, Élodie, Thiago, Giulia, Ananya, Camila, Zane, Ethan, Hao, Mei, Ivy, Hannah, Haruto
  const body = {
    Text: text,
    VoiceId: voice,
    OutputFormat: 'mp3',
    Bitrate: '320k',
    Speed: 0.2
  }

  const response = await fetch('https://api.v8.unrealspeech.com/speech', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  
  if (!response.ok) {
    const errorText = await response.text()
    console.error('🔻 UnrealSpeech Error:', errorText)
    throw new Error('UnrealSpeech TTS failed')
  }

  const data = await response.json()
  return {
    audioUrl: data.OutputUri,
    ttsProvider: 'UnrealSpeech'
  }
}
