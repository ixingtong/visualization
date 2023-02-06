import process from 'node:process'
import c from 'picocolors'
import dayjs from 'dayjs'
import {
  readJSONFromArchive,
  writeJSONToArchive,
} from './utils'
import {
  CONFIG,
  FILE,
} from './constants'
import { fetchBilibiliRelationStat } from './fetchers'

export const bilibiliScript = async () => {
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

async function main () {
  const now = new Date()
  console.log(`\nGenerator started at ${c.cyan(now.toString())}`)

  await bilibiliScript()

  console.log(c.green(`\nGenerated successfully!`))
}

try {
  main()
} catch (err) {
  console.log(c.red(`Ops, something is wrong!`), err)
  process.exit(1)
}
