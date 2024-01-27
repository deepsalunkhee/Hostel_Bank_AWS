import React from 'react'

const Navigator = () => {
  return (
    //The navigator container
    <div className='grid grid-cols-2'>
        {/* The menue bar */}
        <div>
            {/* The logo */}
            <div>
                <img src="" alt="logo" />
            </div>
            {/* The menue */}
            <div>
                <ul>
                    <li>Home</li>
                    <li>Hostels</li>
                    <li>Profile</li>
                    <li>Sign in</li>
                </ul>
            </div>
        </div>
        {/* The Pages */}
        <div>
            diff pages will render here
        </div>

      
    </div>
  )
}

export default Navigator
