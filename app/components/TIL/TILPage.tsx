'use client'

import React from 'react'
import { styled } from 'styled-components'

const TILPage = ({children} : {children: React.ReactNode}) => {
  return (
    <Base>{children}</Base>
  )
}

const Base = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;
  flex-direction: column;
  display: flex;
  gap: 1rem;

  > ul {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding: 0;

    > div {

      @media (max-width: 768px) {
        flex-direction: column;
      }

      > div {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }

      > li {

          &:after {
            content: '';
            position: absolute;
            width: 100%;
            height: 50px;
            top: 0;
            left: 0;
            background-color: #fff;
            z-index: -1;
          }
        }
      }
    }
`

export default TILPage