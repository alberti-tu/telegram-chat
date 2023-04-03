export type ConfigurationGPT = {
  model: string
  temperature?: number
  top_p?: number
  n?: number
  stream?: boolean
  stop?: string | string[]
  max_tokens?: number
  presence_penalty?: number
  frequency_penalty?: number
  logit_bias?: unknown
  user?: string
}

export type RequestGPT = {
  messages: MessageGPT[]
} & ConfigurationGPT

export type MessageGPT = {
  content: string,
  role: 'assistant' | 'system' | 'user',
}