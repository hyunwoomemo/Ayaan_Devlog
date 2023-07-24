'use client'
import React from 'react'
import { styled } from 'styled-components'

interface Props {
  children: React.ReactNode
}

const TILWrapper = ({children} : Props) => {
  return (
    <Base>{children}</Base>
  )
}

const Base = styled.div`
`

export default TILWrapper