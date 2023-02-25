import { registry } from 'dependencyjs'
import { AuthenticationStrategy, JWTAuthenticationStrategy, BasicAuthenticationStrategy } from '../strategies'
import { env } from '../config'
import { DatabaseInitializer } from '../database/DatabaseInitializer'
import { LoggerService, SeederService } from '../services'
import { EmailAuthenticationStrategy } from '../strategies/email.strategy'

export class MigrationObserver {
   private readonly seederService: SeederService
   constructor () {
     this.seederService = new SeederService()
   }

   start (): void {
     // eslint-disable-next-line @typescript-eslint/no-floating-promises
     this.migrateSchema()
     this.registerAuthenticationStrategy()
   }

   async migrateSchema (): Promise<void> {
     LoggerService.Instance.logger.info('Migration start.')
     await DatabaseInitializer.getInstance().setupDatabaseProviders()
     await this.seederService.saveSeedData()
     LoggerService.Instance.logger.info('Migration complete.')
   }

   registerAuthenticationStrategy () {
     registry.register(AuthenticationStrategy, new JWTAuthenticationStrategy(), env.JWT_STRATEGY_NAME)
     registry.register(AuthenticationStrategy, new BasicAuthenticationStrategy(), env.BASIC_STRATEGY_NAME)
     registry.register(AuthenticationStrategy, new EmailAuthenticationStrategy(), env.EMAIL_STRATEGY_NAME)
   }
}
