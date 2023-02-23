import { Request, Response } from 'express'
import { Algorithm } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import { Lottery, Password, Users } from './model'

export interface ApplicationConfig {
  NODE_ENV?: string
  MONGO_DB_URL?: string
  TEST_MODE?: boolean
  PORT?: number
  JWT_ALGO?: Algorithm
  JWT_EXPIRES_IN?: string | number
  NETWORK_WEBHOOK_SECRET?: string
  ALLOWED_ORIGINS?: string[]
  JWT_ISSUER?: string
  PASSWORD_ROUNDS?: number
  JWT_AUDIENCE?: string
  AWS_REGION?: string
 ENCRYPTION_KEY?: string
  ENCRYPTION_IV?: string
  ENCRYPTION_ALGORITHM?: string
  ADMIN_EMAIL?: string
  ADMIN_PASSWORD?: string
  AWS_ACCESS_KEY_ID?: string
  AWS_SECRET_ACCESS_KEY?: string
  FROM_EMAIL?: string
  SERVER_UI_URL?: string
}
export type JWTScopes = Array<'auth' | 'reset_password' | 'verification' | 'intercom' | 'guest' >

export interface JWTAuthenticationStrategyOptions {
  scopes: JWTScopes
}

export type AuthenticationStrategyType = 'jwtAuth' | 'basicAuth' | 'otpAuth' | 'emailAuth' | 'guestJwtAuth'

export type DbType = 'MySql'

export interface ResponseData {
  auth?: AuthenticationStrategyType
  code?: number
  async?: boolean}

export interface ProfileData {
  userId: string
  username: string
  phone: string
  isVerified: boolean
  email: string

}

export interface UserProfile {
  _id: string
  email: string
  name: string
  scopes: string
}

export interface ControllersRequest {
  request: Request
  response: Response
  userProfile: UserProfile
}
export interface UserCredentials {
email: string
password: string
}

export interface QueryFilter {
  limit: number
  skip: number
  }

export interface MongoCollection {
  Users: Collection<Users>
  Lottery: Collection<Lottery>
  Password: Collection<Password>
}

export interface EmailRequest {
  from?: string
  to: string[]
  cc?: string[]
  bcc?: string[]
  attachments?: any[]
  html?: string
  subject: string
  message?: string
}

export interface EmailTemplatedRequest {
  email: string
  html: string
  subject: string
}

export interface CreateEmailTemplatedRequest {
  email: string
  username: string
  otp: string
  adminEmail?: string
}

export interface SharedResourceEmailTemplatedRequest {
  email: string
  otp: string
  resource: string
  adminEmail: string
}

export interface PasswordMailRequest {
  email: string
  username: string
  type: 'SET_PASSWORD' | 'RESET_PASSWORD'
  adminEmail?: string
}
export type UserPassword = Users & {password: string}
