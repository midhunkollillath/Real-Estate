import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Contact = ({listing}) => {
    const [landlord,setLandloard] = useState(null)
    const [message,setMessage] = useState(null)
    const onChange =(e)=>{
        setMessage(e.target.value)
    }
    const listingUseRef = listing.userRef
    useEffect(()=>{
       const fetchLandloard =async()=>{
        const token = localStorage.getItem('accessToken')
        try {
            const res = await fetch(`/api/user/${listingUseRef}`,{
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`, 
                    },
            })
            const data =await res.json()
            setLandloard(data)
        } catch (error) {
            console.log(error,'Error in fetching the user')
        }
       }
       fetchLandloard()
    },[listingUseRef])
  return (
    <>
    {landlord && (
        <div className='flex flex-col gap-2'>
          <p>
            Contact <span className='font-semibold'>{landlord.username}</span>{' '}
            for{' '}
            <span className='font-semibold'>{listing?.name.toLowerCase()}</span>
          </p>
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full border p-3 rounded-lg'
          />

          <Link
          to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
          className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
          >
            Send Message          
          </Link>
        </div>
      )}
      </>
  )
}

export default Contact