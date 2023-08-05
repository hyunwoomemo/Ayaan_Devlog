---
title: 로그인, 인증 기능 구축 프로젝트
date: 2023-07-30
category: javascript
summary: 'jwt와 passport를 이용한 인증 앱 생성하기'
image: 'https://images.unsplash.com/photo-1529539795054-3c162aab037a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
---

# jwt를 이용한 인증 앱 생성하기

> HTTP is a stateless protocol

## Stateless가 무엇인지 알기 위한 예시

![](https://github.com/hyunwoomemo/Ayaan_Devlog/assets/105469077/e2bb2488-248d-415a-b033-c5aa7144fa5a)

첫 번째 요청에서 서버에 이미 사용자123이라 말해도 그 후 서버에게 다시 물어보면 서버는 내가 누군지 모른다. 

HTTP는 stateless(무상태) 프로토콜을 사용

### stateless의 특징

- 서버가 클라이언트의 상태를 보존하지 않음
- 서버 확장성 높음 (스케일 아웃 - 수평 확장 유리)
- 중간에 서버가 장애 나더라도 다른 서버에 연결하면 되기 때문에 문제없이 작업 가능
- 상태를 보존하지 않기 때문에 클라이언트가 데이터를 많이 전송해야하는 단점이 있음
- 데이터가 `stateful`에 비해 상대적으로 큼

---

![](https://github.com/hyunwoomemo/Ayaan_Devlog/assets/105469077/2f16766d-9288-4970-89da-dcc1e6972bde)

서버가 첫 요청을 받은 후에도 내가 누구인지 알기 바란다면 `인증 절차`를 거쳐야 함


## 인증 및 인가 절차 기본 흐름

![](https://github.com/hyunwoomemo/Ayaan_Devlog/assets/105469077/0209d29c-73c7-4b0d-82d3-d7ac247ae0b0)

1. 클라이언트에서 서버로 유저 정보 전송
2. 서버는 유저 정보를 포함하는 토큰을 생성
3. 클라이언트에 토큰을 전송 (HTTP Resoponse Header에 token을 담아서)
4. 클라이언트에서 토큰을 저장
5. 서버로 토큰과 함께 요청을 보냄
6. 서버가 토큰을 복호화해서 유저 정보를 취득

## jwt (json web token)

> JSON 웹 토큰은 두 당사자 간에 클레임을 안전하게 표현하기 위한 개방형 업계 표준 RFC 7519 방식입니다. [jwt 공식문서](https://jwt.io/)

JWT의 구조

![](https://github.com/hyunwoomemo/Ayaan_Devlog/assets/105469077/570a8c24-fbb9-4bf4-8354-72969585d79f)

- Header (빨간색 부분)

토큰에 대한 메타 데이터를 포함 (타입, 해싱 알고리즘 SHA256, RSA...)

- Payload (보라색 부분)

유저 정보(issuer), 만료 기간(expiration time), 주제(subject) 등등..

- Verify Signature (파란색 부분)

JWT의 마지막 세그먼트는 토큰이 보낸 사람에 의해 서명되었으며 어떤 식으로든 변경되지 않았는지 확인하는데 사용되는 서명. 서명은 헤더 및 페이로드 세그먼트, 서명 알고리즘, 비밀 또는 공개 키를 사용하여 생성

### JWT 사용 흐름

유저 로그인 -> 토큰 생성 -> 토큰 보관 -> 요청을 보낼 때 보관하고 있던 Token을 Header에 넣어서 같이 보냄 -> 서버에서는 JWT를 이용해서 Token을 다시 생성한 후 두개를 비교

## 간단한 인증 시스템 구현

### jwt.sign()
```javascript /jwt/#a {14}
const express = require('express');
const jwt = require('jsonwebtoken')

const app = express();
const secretText = 'superSecret';

app.use(express.json());

app.post('/login', (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  // jwt를 이용해서 토큰 생성하기 payload + secretText
  const accessToken = jwt.sign(user, secretText);
  res.json({accessToken})
})

const port = 4000;

app.listen(port, () => {
  console.log('listening' + port)
})
```

![image](https://github.com/hyunwoomemo/Ayaan_Devlog/assets/105469077/833f2aff-9b7b-4615-a203-1c7fcfeb0abb)

### get post api

```javascript
const posts = [
  {
  username: 'John',
    title: 'Post 1',
  },
  {
  username: 'Hyun',
    title: 'Post 2',
  },
]

app.get('/posts', (req, res) => {
  res.json(posts)
})
```

### 인증이 된 사람만 Post를 가져갈 수 있게 만들기

```javascript /authMiddleware/#a
app.get('/posts', authMiddleware, (req, res) => {
  res.json(posts)
})

function authMiddleware(req, res, next) {
  // request header안에 authorizatipn에 token이 있음
  const authHeader = req.headers['authorization'];
  // 보통 token은 'Bearer ~~~~'로 되어있기 때문에 공백을 기준으로 split 메서드를 사용. 배열의 인덱스값 1이 token을 의미
  const token = authHeader && authHeader.split(' ')[1]
  if (token === null) return res.sendStatus(401)

  jwt.verify(token, secretText, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}
```

## RefreshToken 생성하기

최초 accessToken을 발급받고나서 로그아웃하고 다시 로그인 했을 때 새로운 token을 발급 받는다.

이전의 토큰을 사용해도 인증이 가능하기 때문에 RefreshToken 사용 방식을 이용하여 이러한 문제점을 보완한다.

```javascript {6, 20-21, 23-24, 26-30} /expiresIn/#a /cookie/#b 
const express = require('express');
const jwt = require('jsonwebtoken')

const app = express();
const secretText = 'superSecret';
const refreshSecretText = 'refreshSecret'

let refreshTokens = []

app.use(express.json());

app.post('/login', (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  // jwt를 이용해서 토큰 생성하기 payload + secretText
  // 유효기간 추가
  const accessToken = jwt.sign(user, secretText, { expiresIn: '30s' });
  
  // jwt를 이용해서 refreshToken도 생성
  const refreshToken = jwt.sign(user, refreshSecretText, { expiresIn: '1d' });

  // 보통 refreshToken은 데이터베이스에 저장한다고 한다.
  refreshTokens.push(refreshToken)

  // refreshToken을 쿠키에 넣어주기
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  })

  res.json({accessToken})
})

app.get('/posts', authMiddleware, (req, res) => {
  res.json(posts)
})
```

위 코드처럼 설정해주고 `/login` 하게되면 응답으로 accessToken을 받게되고 refreshToken은 쿠키에 저장될 것이다.

그 다음으로, `/post' get 요청을 보내면 정상적으로 posts 객체를 받을 것이다.

하지만 30초 뒤에 다시 '/post' 요청을 보내면 Forbidden 이라는 에러가 발생한다.

왜냐하면, accessToken을 생성할 때, jwt.sign 메소드의 옵션으로 `expiresIn`을 설정해주었기 때문이다.
`const accessToken = jwt.sign(user, secretText, { expiresIn: '30s' }){:js}`

이제 refreshToken을 이용해서 accessToken을 생성해보자 !

### RefreshToken으로 accessToken 생성하기

```javascript {1, 3} title="npm i cookie-parser"
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.get('/refresh', (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(401); 

  const refreshToken = cookies.jwt
  // refreshToken이 데이터베이스에 있는 토큰인지 확인 (여기서는 배열을 확인)
  if (!refreshTokens.includes(refreshToken)) {
    return res.sendStatus(403)
  }

  // 토큰이 유효한 토큰인지 확인
  jwt.verify(refreshToken, refreshSecretText, (err, user) => {
    if (err) return res.sendStatus(403)
    // accessToken을 생성
    const accessToken = jwt.sign({ name: user.name }, secretText, { expiresIn: '30s' })
    
    res.json({accessToken})
  })

})
```