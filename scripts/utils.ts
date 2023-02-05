import path from 'node:path'
import { URL, fileURLToPath } from 'node:url'
import fs from 'fs-extra'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export const resolve = (...args: string[]) => path.resolve(__dirname, '..', ...args)

export function jsonStringify (data: any) {
  return JSON.stringify(data, null, 2)
}

export async function readFileFromData (filename: string) {
  return await fs.readFile(resolve('data', filename), 'utf8')
}

export async function readJSONFromData (filename: string) {
  if (!await fs.exists(resolve('data', filename))) return {}
  return JSON.parse(await readFileFromData(filename))
}

export async function writeFileToData (filename: string, fileContent: string) {
  await fs.ensureDir(resolve('data'))
  await fs.writeFile(resolve('data', filename), fileContent)
}

export async function writeJSONToData (filename: string, data: any) {
  await writeFileToData(filename, jsonStringify(data))
}
