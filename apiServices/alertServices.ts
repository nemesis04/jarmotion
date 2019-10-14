import { IAlert } from '../domains/alert/AlertTypes'
import { authFetch } from './apiConnector'

export async function fetchAlerts(): Promise<IAlert[]> {
  const res = await authFetch<IAlert[]>('GET', `api/alert`)
  if (res.status !== 200) {
    throw Error('Cannot fetch emoji')
  }
  return res.body
}

export async function fetchAlertById(id: string): Promise<IAlert> {
  const res = await authFetch<IAlert>('GET', `api/alert/${id}`)
  if (res.status !== 200) {
    throw Error('Cannot fetch emoji')
  }
  return res.body
}
