import axios from 'axios'
import { Telegraf } from 'telegraf'
import { configuration } from './config'

async function getChatResponse(request: string): Promise<string> {
  return new Promise<string>(resolve => {
    const body = { ...configuration.gptRequest, prompt: request }

    axios.post('https://api.openai.com/v1/completions', body, config)
    .then(response => {
      resolve(response.data.choices[0].text)
    })
    .catch(error => {
      console.error(error.code, '|', new Date().toLocaleString(), '|', error.response.data.error.message)
      resolve(error.response.data.error.message)
    })
  })
}

if (!configuration.botToken?.length || !configuration.chatToken?.length) {
  console.error('Set API keys on config.ts file.')
}

const config = {
  headers: { Authorization: `Bearer ${configuration.chatToken}` }
}

const bot = new Telegraf(configuration.botToken)

console.log('Chat bot is ready to use')

bot.command('start', async context => {
  const response = await getChatResponse('Give me a welcome and list the languages do you know')
  context.reply(response)
})

bot.on('message', async context => {
  const text = (context.update.message as any).text
  const response = await getChatResponse(text)
  context.reply(response)
})

bot.launch()
