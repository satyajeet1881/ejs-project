
import { DbConnectionManager } from './base/connection/DbConnectionManager'
import { MongoConnectionManager } from './mongoDb/connection/MongoDbConnectionManager'

export class DatabaseInitializer {
  private static instance: DatabaseInitializer
  public static getInstance(): DatabaseInitializer {
    // eslint-disable-next-line @typescript-eslint/tslint/config
    if (DatabaseInitializer.instance === null || DatabaseInitializer.instance === undefined)
      DatabaseInitializer.instance = new DatabaseInitializer()
    return DatabaseInitializer.instance
  }

  public async setupDatabaseProviders() {
    await this.configureMongoDb()
  }

  public async getConnection(): Promise<any> {
    const manager: DbConnectionManager = new MongoConnectionManager()
    return manager.getConnection()
  }

  private async configureMongoDb(): Promise<void> {
    const manager: DbConnectionManager = new MongoConnectionManager()
    await manager.getConnection()
  }
}
