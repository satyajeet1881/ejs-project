import { load } from 'dotenv-extended'
import helmet from 'helmet'
import { Algorithm } from 'jsonwebtoken'
import path from 'path'
import winston from 'winston'
import { ConsoleTransportOptions } from 'winston/lib/winston/transports'
import { ApplicationConfig } from './typings'

const environment: ApplicationConfig = load({ errorOnExtra: true, errorOnRegex: true, includeProcessEnv: true })

class EnvironmentConfig {
  JWT_STRATEGY_NAME = 'jwtAuth'
  BASIC_STRATEGY_NAME = 'basicAuth'
  OTP_STRATEGY_NAME = 'otpAuth'
  GUEST_JWT_STRATEGY_NAME = 'guestJwtAuth'
  EMAIL_STRATEGY_NAME = 'emailAuth'
  staticPath = require.resolve(path.join(__dirname, '../../build', 'index.html'))
  ADMIN_EMAIL: string
  ADMIN_PASSWORD: string
  NODE_ENV: string
  PORT: number
  JWT_ALGO: Algorithm
  PASSWORD_ROUNDS = 10
  JWT_ISSUER: string
  JWT_AUDIENCE: string
  JWT_EXPIRES_IN: number
  SERVER_UI_URL: string
  OTP_LENGTH = 6
  TEST_MODE: boolean
  ALLOWED_ORIGINS: string[]
  NETWORK_WEBHOOK_SECRET: string
  ENCRYPTION_KEY: string
  ENCRYPTION_IV: string
  ENCRYPTION_ALGORITHM: string
  FROM_EMAIL: string
  AWS_REGION: string
  AWS_ACCESS_KEY_ID: string
  AWS_SECRET_ACCESS_KEY: string
  MONGO_DB_URL: string
  consoleTransportOptions: ConsoleTransportOptions
  awsEmailSmtp: any
  helmetConfig: Parameters<typeof helmet>[0]

  logOption: any = {
    level: 'debug',
    maxFiles: 120,
    datePattern: 'DD-MM-YYYY'
  }

  constructor(config: ApplicationConfig) {
    this.NODE_ENV = config?.NODE_ENV ?? 'dev'
    this.PORT = config?.PORT ?? 3000
    this.TEST_MODE = (config?.TEST_MODE ?? false).toString() === 'true' ?? false
    this.MONGO_DB_URL = String(config?.MONGO_DB_URL)
    this.JWT_ALGO = config?.JWT_ALGO ?? 'HS256'
    this.JWT_EXPIRES_IN = Number(config?.JWT_EXPIRES_IN)
    this.NETWORK_WEBHOOK_SECRET = String(config.NETWORK_WEBHOOK_SECRET)
    this.ALLOWED_ORIGINS = config.ALLOWED_ORIGINS ?? ['*']
    this.JWT_ISSUER = String(config?.JWT_ISSUER)
    this.SERVER_UI_URL = String(config?.SERVER_UI_URL)
    this.JWT_AUDIENCE = String(config?.JWT_AUDIENCE)
    this.ENCRYPTION_KEY = String(config?.ENCRYPTION_KEY)
    this.ENCRYPTION_IV = String(config?.ENCRYPTION_IV)
    this.ENCRYPTION_ALGORITHM = String(config?.ENCRYPTION_ALGORITHM)
    this.ADMIN_EMAIL = String(config?.ADMIN_EMAIL)
    this.ADMIN_PASSWORD = String(config?.ADMIN_PASSWORD)
    this.AWS_ACCESS_KEY_ID = String(config?.AWS_ACCESS_KEY_ID)
    this.AWS_SECRET_ACCESS_KEY = String(config?.AWS_SECRET_ACCESS_KEY)
    this.FROM_EMAIL = String(config?.FROM_EMAIL)
    this.AWS_REGION = String(config?.AWS_REGION)
    this.PASSWORD_ROUNDS = Number(config.PASSWORD_ROUNDS ?? this.PASSWORD_ROUNDS)
    this.consoleTransportOptions = {
      level: 'info',
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }

    this.helmetConfig = {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          imgSrc: ["'self'", 'data:', 'blob:', '*'],
          // styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com', 'cdn.jsdelivr.net'],
          styleSrcElem: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com', 'cdn.jsdelivr.net'],
          scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'cdn.jsdelivr.net'],
          scriptSrcElem: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'cdn.jsdelivr.net'],
          // objectSrc: ["'self'"],
          fontSrc: ["'self'", 'fonts.googleapis.com', 'fonts.gstatic.com', 'data:'],
          upgradeInsecureRequests: [],
          reportUri: '/report-violation',
          connectSrc: ["'self'"]
        }
      }
      // referrerPolicy: {
      //   policy: 'same-origin'
      // }
    }
  }
}

export const env = new EnvironmentConfig(environment)
