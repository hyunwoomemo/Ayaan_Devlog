---
date: 2023-07-25
category: Nextjs
---

# Next.js 쿼리파라미터 값 가져오기

Next.js 13 App 라우터

```javascript /useSearchParams()/#a /navigation/#b /params.get/#c
import { useSearchParams } from 'next/navigation';

const Page = () => {

  const parmas = useSearchParams();

  // http://localhost:3000/TIL?category=express  

  // category 쿼리 값을 가져오기 위해서 아래와 같이 params 내장 메소드인 get 사용

  console.log(params.get('category')); // express

  return (
    ...
  )
}

```