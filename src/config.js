const NODE_ENV = process.env.NODE_ENV

const config = {
  development: {
    WEB_URL: 'https://what2eat.me',
    LINK_URL: 'https://what2eat.app.link',
    // BASE_URL: 'http://localhost:5050/api',
    BASE_URL: 'https://rm7is5pi3b.execute-api.ap-northeast-2.amazonaws.com/dev',
    AUTH_PUBKEY: `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDKV3M9UazjIEUEVI/Gq8MNTrd2
teWRBlpx+92I3ejgi86BFo1kb4Uh5iBnhouM5/CeqjIvhOEGhlY6nAusZCMmNO2d
fhZ9liiUBpNziZH0cAjpyQ4WCaW89nBuDMn7ZzzhgxdNiLl7Mq7wMZrUlNOLF1Eo
OEQxke9JGLTTwqNb4wIDAQAB
-----END PUBLIC KEY-----`,
    GOOGLE_API_KEY: 'AIzaSyCRDNZxC7GOx96YVc8KgMS32e7NLod1uO4',
    GOOGLE_MAP_KEY: 'AIzaSyDR9L3hTeNXBx7CxOPPgzIZ26b9uKBSS-c',
    GOOGLE_GEO_KEY: 'AIzaSyDR9L3hTeNXBx7CxOPPgzIZ26b9uKBSS-c',
    KAKAO_JS_KEY: 'cc0ac1ff1e0fbed988147684d98bb273',
  },
  production: {
    WEB_URL: 'https://what2eat.me',
    LINK_URL: 'https://what2eat.app.link',
    // BASE_URL: 'https://w2e.kindrobot.me/api',
    BASE_URL: 'https://rm7is5pi3b.execute-api.ap-northeast-2.amazonaws.com/dev',
    AUTH_PUBKEY: `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDKV3M9UazjIEUEVI/Gq8MNTrd2
teWRBlpx+92I3ejgi86BFo1kb4Uh5iBnhouM5/CeqjIvhOEGhlY6nAusZCMmNO2d
fhZ9liiUBpNziZH0cAjpyQ4WCaW89nBuDMn7ZzzhgxdNiLl7Mq7wMZrUlNOLF1Eo
OEQxke9JGLTTwqNb4wIDAQAB
-----END PUBLIC KEY-----`,
    GOOGLE_API_KEY: 'AIzaSyCRDNZxC7GOx96YVc8KgMS32e7NLod1uO4',
    GOOGLE_MAP_KEY: 'AIzaSyDR9L3hTeNXBx7CxOPPgzIZ26b9uKBSS-c',
    GOOGLE_GEO_KEY: 'AIzaSyDR9L3hTeNXBx7CxOPPgzIZ26b9uKBSS-c',
    KAKAO_JS_KEY: 'cc0ac1ff1e0fbed988147684d98bb273',
  },
}

export default config[NODE_ENV]
