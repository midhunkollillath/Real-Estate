
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
    const navigate = useNavigate()
    const currentUser = useSelector(state=>state.user)
    const [searchTerm,setSearchTerm] = useState(null)
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const urlParams = new URLSearchParams(window.location.search)
        urlParams.set('searchTerm',searchTerm)
        const searchQuery = urlParams.toString();
        navigate(`/searching?${searchQuery}`)
    }
    useEffect(()=>{
   const urlParams = new URLSearchParams(location.search);
   const searchTermFromUrl = urlParams.get('searchTerm')
   if(searchTermFromUrl){
    setSearchTerm(searchTermFromUrl)
   }
    },[location.search])
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to={'/'}>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Dream It</span>
            <span className='text-slate-700'>Make It</span>
        </h1>
        </Link>
        <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center'>
            <input type='text' placeholder='Search...' 
            onChange={(e)=>setSearchTerm(e.target.value)}
            value={searchTerm}
            className='bg-transparent focus:outline-none w-24 sm:w-64'/>
        </form>
       
            <ul className='flex gap-4'>
                <Link to={'/'}>
                <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
                </Link>
                <Link to={'/about'}>
                <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
                </Link>
                <Link to={currentUser?.currentUser?.email ?'/profile':'/signin'}>
                    {currentUser ? (
                    <img src={currentUser?.currentUser?.avatar} style={{width:25,height:25,borderRadius:10}}  alt='profile'/>
                    ):(

                <li className='sm:inline text-slate-700 hover:underline'>Sign In</li>
                    )}
                </Link>
            </ul>
        
        </div>
    </header>
  )
}

export default Header