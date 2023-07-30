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


### 인증 및 인가 절차 기본 흐름

![](https://github.com/hyunwoomemo/Ayaan_Devlog/assets/105469077/1e01aae6-98b9-4ec5-be01-4b4a9d3c1a73)
