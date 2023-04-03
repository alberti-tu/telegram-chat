import { ConfigurationGPT } from './gpt'

export interface Configuration {
  botToken: string
  gptToken: string
  gpt: ConfigurationGPT,
}