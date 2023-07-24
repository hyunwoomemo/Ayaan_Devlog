---
date: 2023-07-24
category: express
---

```javascript title="Express에서 파일 전송" caption="res.sendFile()" /__dirname/#a /res.sendFile/#b
function getPost(req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'images', 'forest.jpeg'));
}
```