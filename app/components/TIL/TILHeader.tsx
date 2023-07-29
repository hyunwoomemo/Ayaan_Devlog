'use client'
import Link from 'next/link'
import React from 'react'
import { styled } from 'styled-components'

interface Props {
  category: String[]
}

const TILHeader = ({ category }: Props) => {
  return (
    <Base>
      <ul>
        {category?.map((v, i) => {
          return (
            <Link href={`/TIL?category=${v}`}  key={i}>{v}</Link>
          )
        })}
      </ul>
    </Base>
  )
}

const Base = styled.div`


> ul {
  display: flex;
gap: 1rem;
justify-content: center;
}
`

export default TILHeader