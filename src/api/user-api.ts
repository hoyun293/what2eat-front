import axios from '../utils/http-util'
import config from '../config'
import * as crypto from 'crypto'

export const postSignInApi = () => {
  const account = localStorage.getItem('account')
  const ts = new Date().getTime()
  localStorage.setItem('account-ts', ts.toString())
  let loginInfo = { ts, account }

  const enc = crypto
    .publicEncrypt(config.AUTH_PUBKEY, Buffer.from(JSON.stringify(loginInfo), 'utf8'))
    .toString('base64')
  return axios.post('https://rm7is5pi3b.execute-api.ap-northeast-2.amazonaws.com/dev/login', null, {
    params: { enc }
  })
}
