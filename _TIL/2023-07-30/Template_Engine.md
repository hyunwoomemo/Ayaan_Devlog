---
date: 2023-07-30
category: express
---

# Template Engine

서버에서 정적 웹사이트를 렌더링하는 것이 가능하지만 코드 복제 및 유연성 부족을 포함하여 이 접근 방식에는 많은 제한이 있습니다. 
특히 데이터 베이스에서 데이터를 읽을 때

Express.js는 **템플릿 엔진을 통해 서버 측 애플리케이션에서 동적 HTML 페이지를 생성하는 방법**을 제공

- Template Engine 종류

Pug, EJS, hbs 등등

## hbs 사용하기

### 패키지 설치
`npm i hbs{:bash}`

### 템플릿 엔진을 서버에 등록
```javascript
// 특정 엔진을 템플릿 엔진으로 사용하기 위한 설정
app.set('view engine', 'hbs');
// view 파일들이 모여있는 폴더를 명시
app.set('views', path.join(__dirname, 'views'));
```

### Template 생성
views 폴더 안에 `index.hbs' 파일 생성

```hbs title="views/index.hbs" /static/#a /imageTitle/#b
<!DOCTYPE html>
<html lang="ko">
<head>
  <title>Document</title>
  <link rel="stylesheet" href="static/css/style.css" />
</head>
<body>
  <h1>{{ imageTitle}} </h1>
  <img src="static/images/forest.jpeg" alt="forest" />
</body>
</html>
```

경로 앞에 static를 추가해야한다.

### res.render()

```javascript caption="/경로에 왔을 때 index.hbs 템플릿 파일 이용하고 템플릿 파일에 이용된 변수를 넣어줍니다."
app.get('/', (req, res) => [
  res.render('index', {
    imageTitle: 'It is a forest'
  })
])
```