'use client'
import React from 'react'
import { styled } from 'styled-components'

const Home = ({children}: {children:React.ReactNode}) => {
  return (
    <Base>{children}</Base>
  )
}

const Base = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 80vh;
`

export default Home