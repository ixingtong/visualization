import path from 'node:path'
import { URL, fileURLToPath } from 'node:url'
import fs from 'fs-extra'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export const resolve = (...args: string[]) => path.resolve(__dirname, '..', ...args)

export function jsonStringify(data: any) {
  return JSON.stringify(data, null, 2)
}

export async function readFileFromArchive(filename: string) {
  return await fs.readFile(resolve('archive', filename), 'utf8')
}

export async function readJSONFromArchive(filename: string) {
  if (!(await fs.exists(resolve('archive', filename)))) return {}
  return JSON.parse(await readFileFromArchive(filename))
}

export async function writeFileToArchive(filename: string, fileContent: string) {
  await fs.ensureDir(resolve('archive'))
  await fs.writeFile(resolve('archive', filename), fileContent)
}

export async function writeJSONToArchive(filename: string, data: any) {
  await writeFileToArchive(filename, jsonStringify(data))
}
