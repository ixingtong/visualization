import { copyFile } from 'node:fs/promises'
import process from 'node:process'
import { consola } from 'consola'
import dayjs from 'dayjs'
import pc from 'picocolors'
import { CONFIG, FILE } from './constants'
import { createBilibiliApi } from './fetchers'
import { readJSONFromArchive, resolve, writeJSONToArchive } from './utils'

export async function bilibiliScript() {
  const { relationStats: archivedRelationStats = [] } = await readJSONFromArchive(FILE.BILIBILI)
  const latestRelationStat = archivedRelationStats.at(-1)

  const bilibiliApi = createBilibiliApi()
  const newRelationStat = await bilibiliApi.getRelationStat(CONFIG.BILIBILI_MID)

  const now = new Date()
  const date = dayjs().format('YYYY-MM-DD')

  if (latestRelationStat?.date === date) {
    archivedRelationStats.pop()
  }

  await writeJSONToArchive(FILE.BILIBILI, {
    '//': now.toString(),
    updateAt: now.getTime(),
    relationStats: [
      ...archivedRelationStats,
      {
        ...newRelationStat,
        date,
        ts: now.getTime(),
      },
    ],
  })
}

export async function syncArchive() {
  await copyFile(resolve(`archive/${FILE.BILIBILI}`), resolve(`site/public/${FILE.BILIBILI}`))
}

async function main() {
  const now = new Date()
  consola.success(`Generator started at ${pc.cyan(now.toString())}`)

  await bilibiliScript()

  await syncArchive()

  consola.success(pc.green(`Generated successfully!`))
}

try {
  main()
} catch (err) {
  consola.error(pc.red(`Ops, something is wrong!`), err)
  process.exit(1)
}
