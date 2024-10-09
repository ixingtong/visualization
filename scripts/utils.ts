import { access, mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export const resolve = (...args: string[]) => path.resolve(__dirname, '..', ...args)

export function jsonStringify(data: any) {
  return JSON.stringify(data, null, 2)
}

export async function readFileFromArchive(filename: string) {
  return await readFile(resolve('archive', filename), 'utf8')
}

export async function exists(path: string) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

export async function readJSONFromArchive(filename: string) {
  if (!(await exists(resolve('archive', filename)))) return {}
  return JSON.parse(await readFileFromArchive(filename))
}

export async function writeFileToArchive(filename: string, fileContent: string) {
  // Create archive directory if it doesn't exist yet.
  if (!(await exists(resolve('archive')))) {
    await mkdir(resolve('archive'))
  }
  await writeFile(resolve('archive', filename), fileContent)
}

export async function writeJSONToArchive(filename: string, data: any) {
  await writeFileToArchive(filename, jsonStringify(data))
}
