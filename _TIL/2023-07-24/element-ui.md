---
date: 2023-07-24
category: vue.js
---

```javascript /formatter/#a title="vue.js element-ui" caption="table 사용할 때 property에 format 적용하기" /row/#b {4}
<el-table-column
  property="extra_info"
  label="extra_info"
  :formatter="(row) => row.extra_info ? `${row.extra_info}번 밸브` : undefined"
>
```