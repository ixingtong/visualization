<script lang="ts">
import dayjs from 'dayjs'
import {
  LinkedChart,
  LinkedLabel,
} from 'svelte-tiny-linked-charts'

interface RelationStat {
  mid: number
  following: number
  whisper: number
  black: number
  follower: number
  date: string
  ts: number
}

interface ResponseData {
  updateAt: number
  relationStats: RelationStat[]
}

let updateAt = $state<string>()
let relationStats = $state<RelationStat[]>([])

const dailyStat = $derived({
  labels: relationStats.map(v => v.date),
  values: relationStats.map(v => v.follower)
})
const monthlyRelationStats = $derived(relationStats.reduce<Record<string, number>>((acc, v)=> {
  const month = v.date.slice(0, 7)
  if (acc[month] || acc[month] === 0) {
    acc[month] = v.follower
  } else {
    acc[month] = v.follower
  }
  return acc
}, {}))
const monthlyStat = $derived({
  labels: Object.keys(monthlyRelationStats),
  values: Object.values(monthlyRelationStats)
})

async function fetchData () {
  const res = await fetch('/bilibili.json')
  const data: ResponseData = await res.json()

  updateAt = dayjs(data.updateAt).format('YYYY-MM-DD HH:mm:ss')

  relationStats = data.relationStats
}

fetchData()
</script>

<div class="h-screen w-screen">
  <div class="font-mono p-4 items-center left-0 right-0 top-0 justify-between absolute md:flex">
    <div class="items-end md:flex">
      <h1 class="text-3xl mr-2">
        <a
          class="hover:color-indigo"
          href="https://space.bilibili.com/401315430"
          target="_blank"
        >
          XingTong
        </a>
      </h1>
      <p class="text-lg text-gray-500 mt-2 md:mt-0">bilibili followers trend</p>
    </div>
    <div class="mt-3 md:mt-0">
      <span class="text-gray-400 mr-1">Last update: </span>
      <span class="text-gray-600">
        <a
          class="hover:color-indigo"
          href="https://github.com/ixingtong/visualization/blob/main/archive/bilibili.json" target="_blank"
        >
          { updateAt }
        </a>
      </span>
    </div>
  </div>
  <div class="flex-col-center gap-10 wh-full">
    <div class="flex-col-center">
      <h2 class="text-lg text-zinc-500 font-medium text-right w-full">Daily</h2>
      <div class="w-screen overflow-auto !md:w-800px">
        <LinkedLabel linked="daily" />
        <!-- svelte-ignore attribute_quoted -->
        <LinkedChart
          labels="{dailyStat.labels}"
          values="{dailyStat.values}"
          showValue
          width="{800}"
          height="{100}"
          barMinWidth="{5}"
          fadeOpacity="{0.3}"
          fill="#818cf8"
          valueAppend="followers"
          valuePosition="floating"
          linked="daily"
        />
      </div>
    </div>

    <div class="flex-col-center">
      <h2 class="text-lg text-zinc-500 font-medium text-right w-full">Monthly</h2>
      <div class="w-screen overflow-auto !md:w-800px">
        <LinkedLabel linked="monthly" />
        <!-- svelte-ignore attribute_quoted -->
        <LinkedChart
          labels="{monthlyStat.labels}"
          values="{monthlyStat.values}"
          showValue
          grow
          gap="{10}"
          width="{800}"
          height="{100}"
          barMinWidth="{5}"
          fadeOpacity="{0.3}"
          fill="#818cf8"
          valueAppend="followers"
          valuePosition="floating"
          linked="monthly"
        />
      </div>
    </div>
  </div>
</div>
