import { Telegraf } from 'telegraf'
import { configuration } from './config'
import { getChatResponse } from './lib/chat'

if (!configuration.botToken?.length || !configuration.chatToken?.length) {
  console.error('Set API keys on config.ts file.')
  process.exit()
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
