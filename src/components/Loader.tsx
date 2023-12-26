'use client'

import { RotatingLines } from 'react-loader-spinner';

export default function Loader() {
   return (
      <div className='h-screen flex justify-center'>
         <RotatingLines strokeColor='black' />
      </div>
   )
}
