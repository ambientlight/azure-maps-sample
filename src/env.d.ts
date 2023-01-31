// definitions for environment provided by DefineWebpackPlugin

interface Environment {
  hmr: boolean
  azureSubscriptionKey: string
}

declare var ENVIRONMENT: Environment;