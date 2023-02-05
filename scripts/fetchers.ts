import { $fetch } from 'ohmyfetch'
import type {
  BilibiliRelationStat,
  BilibiliResponse,
} from './types'

export async function fetchBilibiliRelationStat (mid: number) {
  const res = await $fetch<BilibiliResponse<BilibiliRelationStat>>(`https://api.bilibili.com/x/relation/stat?vmid=${mid}`)
  return res?.data ?? {}
}
