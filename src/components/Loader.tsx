'use client'

import { RotatingLines } from 'react-loader-spinner';

const Loader = () => {
   return (
      <div className='h-screen flex justify-center'>
         <RotatingLines strokeColor='black' />
      </div>
   )
}

export default Loader; 