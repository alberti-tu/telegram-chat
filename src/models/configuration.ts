import { ConfigurationGPT } from './gpt'

export interface Configuration {
  botToken: string
  chatToken: string
  gpt: ConfigurationGPT,
}