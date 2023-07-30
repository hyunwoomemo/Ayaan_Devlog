'use client'

import React, { useEffect, useState } from 'react'
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

interface PostsProps {
  date: string,
  categroy: string,
  id: string,
  html: string
}

const TILList = ({ postDate, post }: Props) => {
  const params = useSearchParams();

  const [posts, setPosts] = useState<PostsProps[]>(post);
  const [date, setDate] = useState<string[]>(postDate);
  

  useEffect(() => {
    if (params.get('category')) {
      const filterPost = post.filter((v) => v.category === params.get('category'));
      setPosts(filterPost)
      const filterDate = filterPost.map((v) => v.date);
      setDate(filterDate);
    }
  }, [params, post])


  console.log(posts)

  return (
    <Base>
      {/* {date.reverse().map((v, i) => {
          const postData = filterPost.map((p) => {
            const { id, html } = p;
            return (
              <TILWrapper key={id}>
                <TILItem html={html}></TILItem>
              </TILWrapper>
            )
          })
          return (
            <div key={v+i}>
              <li>{v}</li>
              <div>
              {postData}
              </div>
            </div>
          )
      })} */}
      {posts.map((item, i) => {
        return (
          <TILWrapper key={item.date + i}>
            <span>{item.date}</span>
            <TILItem html={item.html} />
          </TILWrapper>
        )
      })}
    </Base>
  )
}

const Base = styled.ul`
  
`

export default TILList