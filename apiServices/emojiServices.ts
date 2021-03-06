import Moment from 'moment'
import { IEmoji, IEmojiStatsResponse } from '../domains/emojis/EmojiTypes'
import { authFetch } from './apiConnector'

export async function fetchEmojis(userId: string): Promise<IEmoji[]> {
  const res = await authFetch<IEmoji[]>('GET', `api/emoji/user/${userId}`)
  if (res.status !== 200) {
    throw Error('Cannot fetch emoji')
  }
  return res.body
}

export async function fetchEmojisByDate(userId: string, date: Moment.Moment) {
  const res = await authFetch<IEmoji[]>(
    'GET',
    `api/emoji/user/${userId}?date=${date.format('YYYY-MM-DD')}`
  )

  if (res.status !== 200) {
    throw Error('Cannot fetch emoji')
  }
  return res.body
}

export async function addEmoji(emoji: IEmoji): Promise<IEmoji> {
  const res = await authFetch<IEmoji>('POST', 'api/emoji/', emoji)
  if (res.status !== 200) {
    if (res.status === 422) {
      throw Error('Cannot save emoji: data error')
    }
    throw Error('Cannot save emoji: Unknown error')
  }
  return res.body
}

export async function fetchEmojiById(id: string): Promise<IEmoji> {
  const res = await authFetch<IEmoji>('GET', `api/emoji/${id}`)
  if (res.status !== 200) {
    throw Error('Cannot fetch emoji')
  }
  return res.body
}

export async function fetchEmojiStats(
  userId: string,
  year: number,
  month: number
): Promise<IEmojiStatsResponse[]> {
  const res = await authFetch<IEmojiStatsResponse[]>(
    'GET',
    `api/emoji/stats?user_id=${userId}&year=${year}&month=${month}`
  )
  if (res.status !== 200) {
    throw Error('Cannot fetch emoji')
  }
  return res.body
}
