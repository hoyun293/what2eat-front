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
