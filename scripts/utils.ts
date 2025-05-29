import { access, mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

/**
 * Resolve a path relative to the current directory
 * @param args - The path segments to resolve
 * @returns The resolved path
 */
export const resolve = (...args: string[]) =>
  path.resolve(import.meta.dirname, '..', ...args)

/**
 * Check if a file or directory exists
 * @param path - The path to check
 * @returns A promise that resolves to true if the file or directory exists, false otherwise
 */
export async function exists(path: string) {
  return access(path)
    .then(() => true)
    .catch(() => false)
}

interface JSONStringifyOptions {
  replacer?: (string | number)[] | null
  spacer?: string | number
}
export function jsonStringify<T = any>(
  data: T,
  options: JSONStringifyOptions = {},
) {
  return JSON.stringify(data, options.replacer || null, options.spacer || 2)
}

export async function readJSON(filePath: string) {
  if (!(await exists(filePath))) {
    return {}
  }
  try {
    const content = await readFile(filePath, 'utf8')
    return JSON.parse(content)
  } catch (err) {
    console.error(`Error parsing JSON from file ${filePath}:`, err)
    return {}
  }
}

interface WriteJsonOptions extends JSONStringifyOptions {}

export async function writeJSON(
  filePath: string,
  data: any,
  options: WriteJsonOptions = {},
) {
  const dirname = path.dirname(filePath)

  if (!(await exists(dirname))) {
    await mkdir(dirname, { recursive: true }) // create directory recursively
  }

  // check directory exists
  await writeFile(filePath, `${jsonStringify(data, options)}\n`)
}
