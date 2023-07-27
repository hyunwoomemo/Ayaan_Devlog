'use client'

import React from 'react'
import { styled } from 'styled-components'


const PostPage = ({children} : {children: React.ReactNode}) => {
  return (
    <Base>
    {children}
    </Base>
  )
}

const Base = styled.article`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;
  flex-direction: column;
  display: flex;
  gap: 1rem;
  padding-bottom: 5rem;

ul {
  margin: 0;
  padding: 0;
  display: flex;
  gap: 2rem;
  flex-direction: column;
}
`

export default PostPage