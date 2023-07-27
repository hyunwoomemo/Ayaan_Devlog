---
date: 2023-07-26
category: vue.js
---

# Vue slot 키워드

UI의 재사용성을 늘려주는 중요한 기능

```javascript title="components/common/Modal.vue" /slot/#a
<template>
  <div class="modal-container">
    <div class="modal-header">
      <slot name="header">
      </slot>
    </div>

    <div class="modal-body">
      <slot name="body">
        default body11
      </slot>
    </div>

    <div class="modal-footer">
      <slot name="footer">
        default footer
        <button class="modal-default-button" @click="$emit('close')">
          OK
        </button>
      </slot>
    </div>
  </div>
</template>
```

```javascript title="components/TodoInput.vue" /slot/#b
<Modal v-if="showModal" @close="showModal = false">
  <h3 slot="header">
    경고!
  </h3>
  <p slot="body">무언가를 입력하세요.</p>
  <footer slot="footer">copylight</footer>
</Modal>
```

Modal 컴포넌트에서 `<slot name="header"></slot>{:js}` 로 이름을 정하고 안에 default 값을 정의할 수 있다. 


TodoInput 모달 컴포넌트를 사용하는 곳에서 `<h3 slot="header">경고!</h3>{:js}` 위에 정의한 이름 header를 적고 사용하게 되면
TodoInput에 값을 넣었을 땐 `경고!` 가 노출되고 아니면 `default 값` 이 노출된다.