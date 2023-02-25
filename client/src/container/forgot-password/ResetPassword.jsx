import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import restActions from '../../actions/rest'
import ForgotPasswordResetPasswordComponent from '../../components/forgot-password/ResetPassword'
import NotificationMessage from '../../notification/NotificationMessage'
const ForgotPasswordResetPasswordContainer = (props) => {
  const otp = props.params.otp
  let email = props.location.search.split('=')[1]
  let [loader, setLoader] = useState(false)
  function resetPassword(password) {
    setLoader(true)
    const data = { otp, email, password }
    restActions.POST('/auth/login/email/password/set', data).then(
      () => {
        setLoader(false)
        NotificationMessage.showInfo(
          'Password reset successfully, redirecting you to the login page.',
        )
        setTimeout(() => {
          window.location = '/'
        }, 3000)
      },
      (err) => {
        setLoader(false)
        NotificationMessage.showError(err.message)
      },
    )
  }

  return (
    <ForgotPasswordResetPasswordComponent
      loader={loader}
      resetPassword={resetPassword}
    ></ForgotPasswordResetPasswordComponent>
  )
}

function WithNavigate(props) {
  let navigate = useNavigate()
  let params = useParams()
  let location = useLocation()
  return (

    <div className='container '>
    <div className='row d-flex justify-content-center align-items-center h-100 '>
      <div className='col-lg-5 col-sm-8'>
        <div className='white-box mt-3'>
        <ForgotPasswordResetPasswordContainer
      {...props}
      navigate={navigate}
      params={params}
      location={location}
    />
        </div>
      </div>
    </div>
  </div>


  )
}

export default WithNavigate
