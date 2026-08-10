import React from 'react'

export default function Cloud({ className = '', style = {}, ...props }) {
  return (
    <svg
      viewBox="0 0 300 160"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className={className}
      style={{
        background: 'transparent',
        display: 'block',
        ...style,
      }}
      {...props}
    >
      <path
        d="
          M42 125
          C18 125 8 108 15 91
          C20 76 35 69 51 71
          C49 49 66 32 87 34
          C99 18 117 10 137 16
          C154 3 180 10 187 29
          C207 20 229 30 231 51
          C255 48 274 64 274 84
          C291 88 299 103 294 116
          C289 130 276 137 259 137
          L42 137
          C32 137 25 132 42 125
          Z
        "
        fill="white"
      />
    </svg>
  )
}
