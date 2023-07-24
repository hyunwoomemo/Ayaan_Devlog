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
      display: flex;
      justify-content: space-between;

      @media (max-width: 768px) {
        flex-direction: column;
      }

      > div {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        max-width: 70%;
      }

      > li {
        min-width: 100px;
        position: relative;
        overflow: hidden;
        white-space: nowrap;
        @media (min-width:768px) {
          &:before {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 2px;
            height: 300%;
            background-color: #000000;
            z-index: -2;
          }

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
  }
`

export default TILPage