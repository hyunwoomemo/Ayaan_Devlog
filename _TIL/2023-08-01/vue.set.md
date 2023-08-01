---
date: 2023-08-01
category: Vue.js
---

# $set, $delete

Vuejs를 사용하면서 객체 데이터나 배열 데이터를 사용하게 되는데 새로운 속성 및 데이터가 추가되거나 삭제 되는 것을 감지하지 못하는 경우가 생긴다.

여기서 `값이 갱신되었다.`라고 요청을 하는 메소드인 `Vue.set / $set` 와 `Vue.delete / $delete` 가 존재한다.

```javascript
new Vue({
    el: '#app',
    data: {
        obj : {a : 'a'},
        arr : [0, 1, 2]
    },
    methods : {
      changeData : function(){
        // 배열의 값 변경
        // this.$set(arr, index, value)
        Vue.set(this.arr, 2, 3);

        // 객체의 값 변경 및 추가
        // this.$set(obj, key, value)
        Vue.set(this.obj, 'it', 'record');
      },
      removeProperty : function(){
        // 객체의 속성 제거
        // this.$delete(obj, key)
        Vue.delete(this.obj, 'a');
      }
    }
});
```