import axios from 'axios'
import { configuration } from '../config'
import { RequestGPT } from '../models/gpt'

const config = {
  headers: { Authorization: `Bearer ${configuration.chatToken}` }
}

export async function getChatResponse(input: string): Promise<string> {
    return new Promise<string>(resolve => {
      const body: RequestGPT = {
        ...configuration.gpt,
        messages: [
          { role: 'user', content: input },
        ]
      }

      axios.post('https://api.openai.com/v1/chat/completions', body, config)
        .then(response => {
          resolve(response.data.choices[0].message.content)
        })
        .catch(error => {
          console.error(error.code, '|', new Date().toLocaleString(), '|', error.response.data.error.message)
          resolve(error.response.data.error.message)
        })
    })
}