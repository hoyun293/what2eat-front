import axios from '../utils/http-util'
import config from '../config'
import * as crypto from 'crypto'

export const postSignInApi = () => {
  const account = localStorage.getItem('account')
  let loginInfo = { ts: new Date().getTime(), account }

  const enc = crypto
    .publicEncrypt(config.AUTH_PUBKEY, Buffer.from(JSON.stringify(loginInfo), 'utf8'))
    .toString('base64')
  return axios.post('/login', null, { params: { enc } })
}
