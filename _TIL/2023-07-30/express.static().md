---
date: 2023-07-30
category: express
---

# express.static()

Node.js 를 프론트엔드를 위해서도 이용할 수 있음

이미지, CSS파일 및 Javascript 파일과 같은 정적 파일을 제공하려면 Express의 express.static 내장 미들웨어 기능을 사용할 수 있음

- 사용법

`app.use(express.static('public')){:js}`
```javascript
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
```

- 가상 경로 지정

express.static 함수가 제공하는 파일에 대한 가상 경로 접두사(경로가 실제로 파일 시스템에 존재하지 않음)

`app.use('/static', express.static('public')){:js}`
```javascript
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
```

- 절대 경로 사용

그러나 ㄷxpress.static 함수에 제공하는 경로는 노드 프로세스를 시작하는 디렉토리에 상대적

다른 디렉토리에서 익스프레스 앱을 실행하는 경우 제공하려는 디렉토리의 `절대 경로`를 사용하는 것이 더 안전

```javascript /__dirname/#a
const path = require('path');

app.use('/static', express.static(path.join(__dirname, 'public')));
```
