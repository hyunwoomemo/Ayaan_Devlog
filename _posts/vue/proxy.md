---
title: vue 로컬 환경에서 cors 해결하기
date: 2023-07-27
category: vue
summary: 'devServer / proxy'
---

# CORS

## 배경

회사에서 실험실 기능을 개발하던 중, cors 에러를 마주치게 되었다.

실험실의 기능은 url과 body 값을 입력한 후 실행 버튼을 누르면 입력 받은 url로 요청을 보내 결과값을 화면에 그려주는 기능이다.

마치 Swagger 라이브러리에서 제공하는 `swagger UI` 처럼 !

![image](https://github.com/hyunwoomemo/vue_intermediate/assets/105469077/912be859-a7b3-4f46-b7ae-aeb87f32ace9)

어쨌든 중요한 것은 내가 로컬에서 테스트를 할 때 url로 request를 보내고 response를 받아와야한다는 것이다.

요구사항에 맞춰 CRUD 구현한 후 `개발 환경`에서 테스트 URL을 전달 받아 실행 버튼을 클릭했다.

실행 버튼을 클릭하면 아래와 같이 로컬 서버에서 사용자가 작성한 url로 request를 보낼 것이다.

http://localhost:8080 => api주소

🔥 마주친 에러

> Access to XMLHttpRequest at '리퀘스트 받는 url' 
> from origin '리퀘스트 보내는 url' has been blocked by CORS policy:
> Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' 
> header is present on the requested resource.


위 에러를 해결하기 위해서는 우선, CORS와 여러 개념들에 대해 알고 있으면 도움이 된다.

### CORS

CORS는 `Cross-Origin Resource Sharing`의 줄임말이다. 즉, 다른 출처에서의 리소스 공유를 의미한다.

### SOP

Same Origin Policy
다른 출처의 리소스를 사용하는 것을 제한한는 보안 방식

같은 출처에서만 리소스를 공유

### Origin

출처는 Protocol, Host 그리고 포트 번호를 합친 것을 의미한다.

즉, 위 세개가 다 같으면 같은 출처이고 하나라도 다르면 다른 출처인 것이다!

---

SOP는 동일 출처에서의 `request`만 받아들인다. 해커가 스크립트를 심어서 사용자의 인증 토큰을 가져가려고 해도 origin을 확인한 다음에 다른 출처에서 왔다고 판단되면
SOP에 위반된다라고 하면서 해당 요청을 받아들이지 않는다. 

다른 출처의 리소스가 필요한 경우에는 `CORS` 를 사용하는데 CORS는 `추가 HTTP 헤더를 사용`하여 한 출처에서 실행 중인 웹 애플리케이션이 다른 출처의 선택한 자원에 접근할 수 있는 권한을 부여한다.

로컬에서 다른 출처로 request를 보낼건데 출처가 다르니 에러가 발생한다. 이 에러를 해결하기 위해서 Proxy 설정을 할 것이다.

로컬 환경 origin이 A이고 요청을 보내야할 origin이 B 라고 했을 때, proxy 설정을 하게 되면 A에서 B로 요청을 할 떄, proxy가 A를 B로 변경해서 요청을 한다.

![image](https://github.com/hyunwoomemo/ayaan_devlog/assets/105469077/4a6fb024-43df-4adf-be55-462ae14764c2)

# CORS해결을 위한 proxy 코드

요청 보내는 다른 출처의 URL = http://test.com

로컬 환경 = http://localhost:8080

```javascript title="webpack-devserver" /api/#a

  // vue 에서는 vue.config.js
  devServer: {
    proxy: {
      '/api': {
        target: "http://test.com",
        changeOrigin: true,
        pathRewrite: {'/api', ''}
      },
    },
  },
```

```javascript title="api" /api/#a

const {data} = axios.get('/api');

```