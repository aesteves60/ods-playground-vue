import { config } from '@/config'
import { post } from '@/helpers/http'
import { deleteSessionToken, setSessionToken } from '@/helpers/session'

async function signIn(username: string, password: string) {
  return post(config.api.signIn, {
    password,
    username,
  }).then(({ token }) => {
    setSessionToken(token)
  })
}

async function signOut() {
  deleteSessionToken()
  return Promise.resolve()
}

export {
  signIn,
  signOut,
}
