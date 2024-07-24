import React from 'react'
import { AuthErrorProps } from '../../types/ErrorType'

const AuthError:React.FC<AuthErrorProps> = ({item}) => {
    if (!item) return null;
  return (
    <div>
      <div className='text-red-600 text-xs  mb-4 italic'>
        {item}
      </div>
    </div>
  )
}

export default AuthError
