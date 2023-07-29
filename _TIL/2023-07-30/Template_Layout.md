---
date: 2023-07-30
category: express
---

# Template Layout 생성하기

## Layout 생성하기

```hbs title="views/layout.hbs" /body/#a
<!DOCTYPE html>
<html lang="ko">
<head>
  <title>Document</title>
  <link rel="stylesheet" href="static/css/style.css" />
</head>
<body>
  <h1>It is a layout</h1>
  {{{ body }}}
</body>
</html>
```

## index.hbs

```hbs
<h1>{{imageTitle}}</h1>
<img src="static/images/forest.jpeg" alt="forest" />
```

## post.hbs

```hbs
<p>It is a {{templateName}}</p>
```

```javascript title="controllers/posts.controller.js"
function getPost(req, res) {
  res.render('posts', {
    templateName: 'post'
  })
}
```

```javascript title="routes/posts.router.js"
const express = require('express');
const postsRouter = express.Router();
const postsController = require('../controllers/posts.controller')

postsRouter.get('/', postsController.getPost)
```