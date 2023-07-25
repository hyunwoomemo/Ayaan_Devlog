'use client'

import React from 'react'
import { styled } from 'styled-components'
import TILHeader from './TILHeader'
import TILWrapper from './TILWrapper'
import TILItem from './TILItem'
import { useSearchParams } from 'next/navigation'

interface Props {
  postDate: any[],
  post: any[],
  children: React.ReactNode
}

const TILList = ({ postDate, post }: Props) => {
  const params = useSearchParams();

  return (
    <Base>
      {postDate.reverse().map((v) => {
          const filterPost = params.get('category')  ? post.filter((p) => p.date === v && p.category === params.get('category')) : post.filter((p) => p.date === v);
          const categories = post.map((item) => item.category);
          const postData = filterPost.map((p) => {
            const { id, html } = p;
            return (
              <TILWrapper key={id}>
                <TILItem html={html}></TILItem>
              </TILWrapper>
            )
          })
          return (
            <div key={v}>
              <li>{v}</li>
              <div>
              {postData}
              </div>
            </div>
          )
      })}
    </Base>
  )
}

const Base = styled.ul`
  
`

export default TILList