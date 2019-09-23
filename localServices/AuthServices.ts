import * as SecureStore from 'expo-secure-store'
import { AuthStatus } from '../domains/auth/AuthTypes'

const AUTH_TOKEN_KEY = 'auth_token'

export async function getAuthStatus(): Promise<AuthStatus> {
  try {
    const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY)
    return token ? { auth: true, token } : { auth: false }
  } catch (err) {
    return { auth: false }
  }
}

export async function setAuthToken(token: string) {
  await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token)
}