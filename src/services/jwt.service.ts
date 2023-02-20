
import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken'
import { isNil, pick, set } from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import { env } from '../config'
import { JWTScopes, UserProfile } from '../typings'
import { unauthorized } from '../utils'

export class JWTService {
     private static instance: JWTService
     verifyToken (token: string, scopes: JWTScopes = ['auth']): UserProfile {
       try {
         console.log('env.JWT_ALGO,', env.JWT_ALGO)
         const audience = env?.JWT_AUDIENCE.split(/\s|,/)
         const options: VerifyOptions = { issuer: env.JWT_ISSUER, algorithms: [env.JWT_ALGO], audience }
         const { payload } = verify(token, env.NETWORK_WEBHOOK_SECRET, options) as {payload: UserProfile}
         const validScope = scopes.some(scope => payload?.scopes.includes(scope))
         if (!validScope) throw new Error('invalid jwt scope')
         const fields = ['_id', 'name', 'email']
         const response = pick(payload, fields) as UserProfile
         if (!isNil(payload.scopes) && payload.scopes.includes('intercom') === true) set(response, 'scope', 'intercom')
         return response
       } catch (error) {
         throw unauthorized('invalid login credentials')
       }
     }

     generateToken (userProfile: UserProfile, scopes: JWTScopes = ['auth'], expiresIn?: number | string): string {
       const additionalUserData = set(userProfile, 'scopes', scopes)
       const payload = { id: userProfile._id, ...additionalUserData }
       const audience = env?.JWT_AUDIENCE.split(/\s|,/)
       const signingOptions: SignOptions = {
         audience,
         expiresIn: expiresIn ?? env.JWT_EXPIRES_IN,
         issuer: env.JWT_ISSUER,
         algorithm: env.JWT_ALGO,
         subject: userProfile._id ?? userProfile.email,
         jwtid: uuidv4()
       }
       const token = sign({ payload }, env.NETWORK_WEBHOOK_SECRET, signingOptions)
       return token
     }

     public static get Instance () {
       if (isNil(this.instance))
         this.instance = new this()

       return this.instance
     }
}
