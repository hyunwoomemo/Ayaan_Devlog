---
title: 로그인, 인증 기능 구축 프로젝트
date: 2023-08-09
category: javascript
summary: 'passport를 이용한 인증 앱 생성하기'
image: ''
---

# passport 모듈을 이용한 인증 앱 생성하기

Passport를 이용해서 만들 앱은 이메일과 비밀번호를 이용해서 로그인하는 것과 구글 아이디를 이용하여 OAuth 로그인을 할 수 있는 앱을 구현

**passport는 `세션`을 이용함**

## server.js 초기 셋팅

`npm install express nodemon{:shell}`

```javascript title="src/server.js" caption="server.js 초기 셋팅"
const express = require('express')
const app = express()

app.use(express.json())

const port = 4000;

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})
```

> express.json()
> 
> Express에 내장된 미들웨어 함수. `body-parser`를 기반으로 JSON 페이로드가 포함된 수신 요청을 구문 분석한다.

```json title="package.json" {3}
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon src/server.js"
  },
```

