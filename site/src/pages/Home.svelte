<script lang="ts">
  import dayjs from 'dayjs'
  import {
  LinkedChart,
  LinkedLabel,
} from "svelte-tiny-linked-charts"

  let updateAt: string | undefined
  let labels: string[] = []
  let values: number[] = []

  async function fetchData () {
    const res = await fetch('/bilibili.json')
    const data = await res.json()

    updateAt = dayjs(data.updateAt).format('YYYY-MM-DD HH:mm:ss')

    const { relationStats = [] } = data

    relationStats.forEach((item: any) => {
      labels = [...labels, item.date]
      values = [...values, item.follower]
    })
  }

  try {
    fetchData()
  } catch (err) {
    console.log(err)
  }
</script>

<div class="h-screen w-screen">
  <div class="absolute top-4 left-4 font-mono flex items-end">
    <h1 class="text-3xl mr-2">
      <a class="hover:color-indigo" href="https://space.bilibili.com/401315430" target="_blank">XingTong</a>
    </h1>
    <p class="text-lg text-gray-500">bilibili followers trend</p>
  </div>
  <p class="absolute top-4 right-4">
    <span class="text-gray-400 mr-1">Last update: </span>
    <span class="text-gray-600">
      <a class="hover:color-indigo" href="https://github.com/ixingtong/visualization/blob/main/archive/bilibili.json" target="_blank">{ updateAt }</a>
    </span>
  </p>
  <div class="w-full h-full flex flex-col justify-center items-center">
    <div class="w-800px">
      <LinkedLabel linked="bilibili" />
      <LinkedChart
        { labels }
        { values }
        showValue
        width="{800}"
        height="{100}"
        barMinWidth="{5}"
        fadeOpacity="{0.3}"
        fill="rgb(255, 0, 0)"
        valueAppend="followers"
        valuePosition="floating"
        linked="bilibili"
      />
    </div>
  </div>
</div>
