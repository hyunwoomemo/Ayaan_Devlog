'use client'
import React from 'react'
import { styled } from 'styled-components'

interface objectProps {
  category: string;
  length: number;
}

interface Props {
  categories: objectProps[]
}

const Category = ({categories}: Props) => {
  return (
    
    <Base>
      <input type="text" />
      <input type="text" />
      {categories.map((v) => {
        return (
          <CategoryItem key={v.category}>
          <div>{v.category}</div>
          <div>{v.length}</div>
          </CategoryItem>
        )
      })}
    </Base>
  )
}

const Base = styled.div`
@media (min-width:768px) {

  background-color: gray;
  padding: 1rem;
}
`

const CategoryTitle = styled.div`
  padding-bottom: 1rem;
`

const CategoryItem = styled.div`
  display: flex;
  gap: 10px;
`

export default Category