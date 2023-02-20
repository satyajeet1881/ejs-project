class EnvironmentConfig {
  constructor(config) {
    this.REACT_APP_PORT = config?.REACT_APP_PORT ?? 5000
    this.REACT_APP_PUBLIC_URL = config.REACT_APP_PUBLIC_URL ?? ''
    this.REACT_APP_BACKEND_BASE_URL = config.REACT_APP_BACKEND_BASE_URL ?? ''
  }
}
export const env = new EnvironmentConfig(process.env)