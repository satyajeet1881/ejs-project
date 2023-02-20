import { constants, promises as fs } from 'fs'
import { generate } from 'generate-password'
import { v4 as uuidv4 } from 'uuid'
export const generatePassword = (): string => generate({
  strict: true,
  length: 30,
  numbers: true,
  uppercase: true,
  lowercase: true,
  symbols: true
})

export const generateV4ID: string = uuidv4()

/**
 * Generates a random OTP for use
 *
 * @param length length of the OTP to generate
 *
 * @returns string
 */
export function generateRandomOTP(length: number): string {
  const randomValue = []
  for (let i = 0; i < length; i++)
    randomValue.push(Math.floor(Math.random() * 10))

  return randomValue.join('')
}

/**
 * check if file exists
 *
 * @export
 * @param {string} path
 * @returns {Promise<boolean>}
 */
export async function fileExists(path: string): Promise<boolean> {
  const exists = await fs.access(path, constants.F_OK).then(() => true).catch(() => false)
  return exists
}

/**
 * readFiles
 *
 * @export
 * @param {string[]} paths
 * @returns
 */
export async function readFiles(paths: string[]): Promise<Buffer[]> {
  return Promise.all(paths.map(async path => fs.readFile(path)))
}

/**
 * write files
 *
 * @export
 * @param {Array<{ path: string; content: string }>} files
 * @returns {Promise<PromiseSettledResult<void>[]>}
 */
export async function writeFiles(files: Array<{ path: string; content: string }>): Promise<void[]> {
  return Promise.all(files.map(async ({ path, content }) => fs.writeFile(path, content)))
}

/**
 * jsonStringify
 * @export
 * @param {any} data
 * @returns
 */
export function jsonStringify(data: any): any {
  try {
    return JSON.stringify(data)
  } catch (_error) {
    return data
  }
}

/**
 * getUniqArray
 *
 * @export
 * @param {any[]} array
 * @returns
 */
export function getUniqArray(array: any[]): any[] {
  return array.filter((value, index, self) => self.indexOf(value) === index)
}
