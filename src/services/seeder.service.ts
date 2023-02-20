
import { isNil } from 'lodash'
import { env } from '../config'
import { UserRepository, PasswordRepository } from '../database/repository'

export class SeederService {
  private readonly userRepository: UserRepository
  private readonly passwordRepository: PasswordRepository

  constructor() {
    this.userRepository = new UserRepository()
    this.passwordRepository = new PasswordRepository()
  }

  async saveSeedData(): Promise<void> {
    const email = env.ADMIN_EMAIL
    const password = env.ADMIN_PASSWORD
    const user = await this.userRepository.getUser(email)
    if (!isNil(user))
      return

    const result = await this.userRepository.saveUser({ email, name: 'Admin' })
    await this.passwordRepository.upsertPassword(result._id, password)
  }
}
