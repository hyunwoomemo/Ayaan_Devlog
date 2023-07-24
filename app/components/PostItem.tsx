'use client'
import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'

interface Props {
  children: React.ReactNode,
  hide:boolean
}

const PostItem = ({ children }: Props) => {

  return (
    <Base>{children}</Base>
  )
}

const Base = styled.div`
width: 100%;
list-style: none;
cursor: pointer;

 > a {
  display: flex;
  gap: 1rem;
  flex-direction: column;

  li:first-of-type {
    color: gray;
  }

  li:nth-of-type(2) {
    font-size: 24px;
  }
 }
`

export default PostItem