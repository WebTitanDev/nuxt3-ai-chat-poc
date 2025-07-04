interface GroqChatCompletion {
  choices: Array<{
    message: {
      content: string
    }
  }>
}

export const fetchGroqReply = async (message: string): Promise<string> => {
  const config = useRuntimeConfig()
  const response = await $fetch<GroqChatCompletion>('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.groqApiKey}`,
      'Content-Type': 'application/json',
    },
    body: {
      model: 'llama3-8b-8192',
      messages: [
        { role: 'system', content: 'Respond only in natural Japanese' },
        { role: 'user', content: message }
      ]
    }
  }) as GroqChatCompletion
  

  return response.choices[0].message.content
}