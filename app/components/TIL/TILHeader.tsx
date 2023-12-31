'use client'
import Link from 'next/link'
import React, { ChangeEvent, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'

interface Props {
  category: String[]
}

const TILHeader = ({ category }: Props) => {
  const [selectCategory, setSelectCategory] = useState('');
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