import { useState } from 'react'
import restActions from '../../actions/rest'
import ForgotPasswordResetLinkComponent from '../../components/forgot-password/ResetLink'
import NotificationMessage from '../../notification/NotificationMessage'

const ForgotPasswordResetLinkContainer = () => {
  let [loader, setLoader] = useState(false)
  let [isResponseArrived, setIsResponseArrived] = useState(false)

  function resetLink(email) {
    setLoader(true)
    restActions.POST("/auth/login/email/password/link", { email: email }).then(
      () => {
        setLoader(false)
        setIsResponseArrived(true)
        NotificationMessage.showInfo('Mail has been sent successfully')
      },
      (err) => {
        setLoader(false)
        NotificationMessage.showError(err) // message
      },
    )
  }

  return (
    <div className='container '>
      <div className='row d-flex justify-content-center align-items-center h-100 '>
        <div className='col-lg-5 col-sm-8'>
          <div className='white-box mt-3'>
          <ForgotPasswordResetLinkComponent
      loader={loader}
      resetLink={resetLink}
      isResponseArrived={isResponseArrived}
    ></ForgotPasswordResetLinkComponent>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordResetLinkContainer
