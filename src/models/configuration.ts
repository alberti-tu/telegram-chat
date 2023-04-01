import { gptRequest } from './gpt'

export interface Configuration {
  botToken: string
  chatToken: string
  gptRequest: gptRequest,
}