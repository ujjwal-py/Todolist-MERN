import React from 'react'
import four from '../assets/404.png'

function FourOFour() {
  return (
    <div>
        <div className='flex flex-col gap-4 justify-center items-center m-4'>
            <img src = {four} className='w-[400px] h-[400px]'  />
            <h2 className='text-yellow-300'>This Page is Wrong</h2>
            <p className='font-normal'>You have been trying for ten minutes. It's pretty late at night and pretty dark in your room. You reach over and flick on a lamp. You feel oh so stupid. The gap in the toy is a triangle and you only have the cylinder and cube pieces. In dismay you toss the toy aside. Curse your five year old's inability to keep track of the triangle!</p>
        </div>
    </div>
  )
}

export default FourOFour