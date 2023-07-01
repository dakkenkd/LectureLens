import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useStore from '../store'

export const useError = () => {
    const navigate = useNavigate()
    const resetEditedReview = useStore((state) => state.resetEditedReview)
    const getCsrfToken = async() => {
        const { data }  = await axios.get(`${process.env.REACT_APP_API_URL}/csrf`)
        // CSRFトークンをヘッダーに設定
        axios.defaults.headers.post['X-CSRF-Token'] = data.csrfToken
    }

    const switchErrorHandling = (msg) => {
        switch (msg) {
            case 'invalid csrf token':
                getCsrfToken()
                alert('CSRF token is invalid, please try again')
                break
            case 'invalid or expired jwt':
                alert('access token expired, please login')
                resetEditedReview()
                navigate('/')
                break
            case 'missing or malformed jwt':
                alert('access token is not valid, please login')
                resetEditedReview()
                navigate('/')
                break
            case 'duplicated key not allowed':
                alert('email already exist, please use another one')
                break
            case 'crypto/bcrypt: hashedPassword is not the hash of the given password':
                alert('password is not correct')
                break
            case 'record not found':
                alert('email is not correct')
                break
            default:
                alert(msg)
          }
    }
    return { switchErrorHandling }
}