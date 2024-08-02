import '../style.css'
import { ErrorMsgProps } from '../types'

const ErrorComponent = ({ errorMsg }: ErrorMsgProps) => {
    return (
        <div className='error-msg-container'>
            <p>{errorMsg}</p>
        </div>
    )
}

export default ErrorComponent