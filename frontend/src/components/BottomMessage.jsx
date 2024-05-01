import React from 'react'
import {  Link } from 'react-router-dom';

export default function BottomMessage({label , pathTo , pathText}) {
  return (
    <div>
    <div>
        
    <span className='font-medium text-left'> {label}  </span>
    <Link className='underline decoration-1' to={pathTo}>{pathText}</Link>
    </div>
    </div>
  )
}
