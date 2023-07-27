---
title: vue 로컬 환경에서 cors 해결하기
date: 2023-07-27
category: Vue
summary: 'devServer / proxy'
---

# CORS

## 배경

회사에서 실험실 기능을 개발하던 중, cors 에러를 마주치게 되었다.

실험실의 기능은 url과 body 값을 입력한 후 실행 버튼을 누르면 입력 받은 url로 요청을 보내 결과값을 화면에 그려주는 기능이다.

마치 Swagger 라이브러리에서 제공하는 `swagger UI` 처럼 !

![image](https://github.com/hyunwoomemo/vue_intermediate/assets/105469077/912be859-a7b3-4f46-b7ae-aeb87f32ace9)

어쨌든 dev 환경이든, production 환경이든 나는 외부 url로 request를 보내야한다.

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

