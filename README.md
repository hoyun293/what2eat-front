# Set up

> npm install -g ionic@latest
> npm install -g yarn
> yarn
> yarn dev

`localhost:5500` 에서 확인가능

# VS code 사용시 필수 확장

- eslint
- prettier

# CSS

tailwind CSS의 일부 내용을 `src/theme/fuctional.scss`에 정의하여 사용

https://tailwindcss.com/

# Mock Data 호출을 위한 API SERVER

express 서버로 구성, mock data 라이브러리로 faker.js 이용, https://github.com/marak/Faker.js/

- server / front 함께 run

> yarn dev

- server 만 구동

> yarn server

`localhost:5050/api/news` 를 호출 하면 api 결과를 볼 수 있습니다.

# build 준비

- setup

https://capacitor.ionicframework.com/docs/getting-started/dependencies

- capacitor init(이미 하였음)

https://capacitor.ionicframework.com/docs/getting-started/with-ionic/

- create ios

https://capacitor.ionicframework.com/docs/ios

```
$ yarn build

// ios platform 추가
$ npx cap add ios

// update dependencies and copies any web assets to your project
$ npx cap sync

// launch xcode
$ npx cap open
```

- live reload

```
  yarn sync

  yarn dev:ios or yarn dev:and
```

> Android에서 live-reload를 하려고하면 cleartext not permitted 오류가 난다. `android/app/src/main/AndroidManifest.xml` 에 다음과 같이 추가한다.

```
    <application
        ...
        android:usesCleartextTraffic="true"
        ...
```

# 배포

- build 한 파일 구동

> yarn build && yarn serve:build

- 다음 포스팅을 참고합니다.

https://www.joshmorony.com/deploying-capacitor-applications-to-android-development-distribution/

- android keysotre password : what2eat11!!

- android alias : what2eat

- ios distribution key : htbi11!!

- keystore 파일이 필요하면 저한테 문의해주세요.