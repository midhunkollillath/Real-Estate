
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/UserSlice'
import { useNavigate } from 'react-router-dom'
function OAuth() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const handleGoole=async()=>{
        try {
            const Provider =new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth,Provider)

            const res = await fetch('/api/auth/google',{
              method:'POST',
              headers:{
                'Content-Type':'application/json'
              },
              body:JSON.stringify({name:result.user.displayName,email:result.user.email,photo:result.user.photoURL})
            })
            const data = await res.json()
            dispatch(signInSuccess(data))
            navigate('/')
        } catch (error) {
           console.log(error) 
        }
    }
  return (
    <button onClick={handleGoole} type='button' className='bg-cyan-700 text-white p-3 rounded-lg uppercase
    hover:opacity-95'>
        Continue with Google
    </button>
  )
}

export default OAuth