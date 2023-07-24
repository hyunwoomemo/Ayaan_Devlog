'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components'

const Header = () => {
  const [scrollHeight, setScrollHeight] = useState(0);
  const [clientY, setClientY] = useState(0);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollHeight(window.scrollY);
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }

  }, [scrollHeight]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setClientY(e.clientY);
    }
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [scrollHeight])

  useEffect(() => {
    if (scrollHeight > 100 && clientY > 100) {
      setShowHeader(false);
    } else if (scrollHeight > 100 && clientY < 100) {
      setShowHeader(true)
    } else setShowHeader(true);

  }, [scrollHeight, clientY])
  
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (!isDark) { 
      localStorage.setItem('theme', 'light');
      document.body.dataset.theme = 'light';
    } else {
      localStorage.setItem('theme', 'dark');
      document.body.dataset.theme = 'dark';
    }
  }, [isDark])

  useEffect(() => {
    localStorage.getItem('theme') === 'light'? setIsDark(true) : setIsDark(false);
  }, [])

  return (
    <Base showHeader={showHeader}>
      <Link href="/">Ayaan</Link>
        <Link href="/blog">BLOG</Link>
        <Link href="/TIL">TIL</Link>
      <Link href="/about">ABOUT</Link>
      <span><button onClick={() => setIsDark(!isDark)}>click</button></span>
    </Base>
  )
}

const Base = styled.header<{showHeader: boolean}>`
  display: flex;
  gap: 1rem;
  min-height: 60px;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  padding: 1rem;
  border-bottom: 1px solid black;
  position: sticky;
  top: 0;
  z-index: 99;
  transform: ${props => props.showHeader ? 'translateY(0)' : 'translateY(-100%)'};
  transition: all .3s ease-in-out;

  >div {
    display: flex;
    gap: 2rem;
  }

  > a {
  }
`

export default Header