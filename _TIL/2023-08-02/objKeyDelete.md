---
date: 2023-08-02
category: Javascript
---

# 객체 특정 key값 삭제하기

회사에서 프로젝트 중 이것 저것 실험하다가 UI 로직을 위한 변수를 데이터 베이스에 저장하고 말았다...

`예시`

```javascript
const obj = {
  a: value1,
  b: value2,
  c: value3,
  test: test1 // 데이터 베이스에 저장됨
}
```

원래 depth가 있는 객체지만 간단한 객체로 예시를 들었다.

데이터베이스 configuration이라는 `컬럼에 json 데이터`로 값이 저장되기 때문에 일일이 찾아서 삭제하기에는 번거로울 것 같았다.

그래서 선택한 방법은 객체를 담아 body값에 넘겨서 데이터베이스에 저장했듯이
body값에 제거하고 싶은 key값을 제외한 객체를 보내서 데이터를 갱신하기로 했다. 

```javascript
// axios.post('/url', 기존객체)
axios.post('/url', 바뀐 객체)
```

이제 수많은 객체에서 특정 key값을 제거해보자.
arr 이라는 배열에 수많은 객체가 담겨있다고 가정하자. 난 객체에 들어있는 test라는 key값을 전부 삭제할 것이다.

```javascript
const cleanArr = arr.map((item) => {
  const {test, ...rest} = item;
  return rest
})

axios.post('/url', cleanArr)
```

`구조분해`와 `...rest` 키워드를 사용해 해결했다.

> 데이터베이스에 저장으로 이어지는 로직은 신중하게 작업하자 😅