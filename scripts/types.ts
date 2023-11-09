/**
 * @see https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/user/status_number.md#%E5%85%B3%E7%B3%BB%E7%8A%B6%E6%80%81%E6%95%B0
 */

export interface BilibiliRelationStat {
  mid: number
  following: number
  whisper: number
  black: number
  follower: number
}

export interface BilibiliResponse<T = any> {
  code: string
  message: string
  ttl: number
  data: T
}
