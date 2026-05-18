import React from 'react'

const Title = ({ text1, text2 }) => {
  return (
    <div className='inline-flex items-center gap-3 mb-6'>
      <h2 className='text-2xl sm:text-3xl font-medium tracking-wide text-ink'>
        {text1} <span className='text-muted font-light'>{text2}</span>
      </h2>
      <span className='block w-12 h-px bg-accent'></span>
    </div>
  )
}

export default Title
