'use client'
import React, { useEffect } from 'react'
import './Component.css'

export const SubscribeBlock: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://eocampaign1.com/form/9e76089e-5bb5-11f0-bf9f-ed28c90d6451.js'
    script.setAttribute('data-form', '9e76089e-5bb5-11f0-bf9f-ed28c90d6451')
    script.async = true
    document.getElementById('subscribe-form')?.appendChild(script)
  }, [])

  return (
    <div
        className='subscribe-form'
        style={{ display: 'flex', justifyContent: 'center' }}
    >
      <div id="subscribe-form" />
    </div>
  )
}
