import { ofetch } from 'ofetch'
import type { $Fetch, FetchOptions } from 'ofetch'
import type { BilibiliRelationStat, BilibiliResponse } from './types'

export interface BilibiliApiOptions extends FetchOptions {}

export const DEFAULT_BILIBILI_OPTIONS: BilibiliApiOptions = {
  baseURL: 'https://api.bilibili.com',
}

export class BilibiliApi {
  #fetch: $Fetch
  #options: BilibiliApiOptions

  constructor(options: BilibiliApiOptions = {}) {
    this.#options = { ...DEFAULT_BILIBILI_OPTIONS, ...options }
    this.#fetch = ofetch.create(this.#options)
  }

  get options() {
    return this.#options
  }

  async getRelationStat(mid: number) {
    const res = await this.#fetch<BilibiliResponse<BilibiliRelationStat>>(
      `/x/relation/stat?vmid=${mid}`,
    )
    return res.data ?? {}
  }
}

export const createBilibiliApi = (options: BilibiliApiOptions = {}) =>
  new BilibiliApi(options)
