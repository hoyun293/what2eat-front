import { BranchIo } from '@ionic-native/branch-io'

export const initDeeplinkBranchIo = async () => {
  BranchIo.initSession().then(data => {
    if (data['+clicked_branch_link']) {
      console.log(JSON.stringify(data))
      window.location.href = `/${data.$deeplink_path}`
    }
  })
}

export const shareLink = (voteUrl: string, title: string) => {
  const properties = {
    canonicalIdentifier: `vote/${voteUrl}`,
    canonicalUrl: `https://what2eat.me/vote/${voteUrl}`,
    title,
    contentDescription: '오늘 뭐 먹을래? : 함께 투표해요!',
    contentImageUrl: 'https://what2eat.me/assets/img/logo.png'
  }

  BranchIo.createBranchUniversalObject(properties)
    .then(function(branchObj) {
      console.log('Response: ' + JSON.stringify(branchObj))

      branchObj
        .generateShortUrl({}, {})
        .then(function(res) {
          const urlProperties = {
            $deeplink_path: `vote/${voteUrl}`
          }
          console.log('Response: ' + JSON.stringify(res.url))
          branchObj.showShareSheet({}, urlProperties, title)
        })
        .catch(function(err) {
          console.log('Error: ' + JSON.stringify(err))
        })
    })
    .catch(function(err) {
      console.log('Error: ' + JSON.stringify(err))
    })
}
