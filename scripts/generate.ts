import process from 'node:process'
import fs from 'node:fs/promises'
import c from 'picocolors'
import dayjs from 'dayjs'
import { readJSONFromArchive, resolve, writeJSONToArchive } from './utils'
import { CONFIG, FILE } from './constants'
import { fetchBilibiliRelationStat } from './fetchers'

export async function bilibiliScript() {
  const { relationStats: archivedRelationStats = [] } = await readJSONFromArchive(FILE.BILIBILI)
  const latestRelationStat = archivedRelationStats.at(-1)

  const newRelationStat = await fetchBilibiliRelationStat(CONFIG.BILIBILI_MID)

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
  await fs.copyFile(resolve(`archive/${FILE.BILIBILI}`), resolve(`site/public/${FILE.BILIBILI}`))
}

async function main() {
  const now = new Date()
  console.log(`\nGenerator started at ${c.cyan(now.toString())}`)

  await bilibiliScript()

  await syncArchive()

  console.log(c.green(`\nGenerated successfully!`))
}

try {
  main()
} catch (err) {
  console.log(c.red(`Ops, something is wrong!`), err)
  process.exit(1)
}
