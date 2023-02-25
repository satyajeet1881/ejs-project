import React, { Component } from 'react'
 const errorMessage = {
  emailFormat: 'Please enter the correct email address',
  confirmPasswordEmpty: 'Please enter COnform Password',
  emailEmpty: 'Please enter email',
  passwordEmpty:"Please enter email",
  passwordMatch:"Password dose match"
 }
class ForgotPasswordResetPasswordComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: {},
      errors: {},
    }
  }

  setErrors = (key, value) => {
    let errors = this.state.errors
    errors[key] = value
    this.setState({ errors })
  }

  handleChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    let fields = this.state.fields
    fields[name] = value

    this.setState({ fields })
  }
  isMatched = ( password, confirmPassword)=> {
    return password === confirmPassword
  }

   validatePassword=(password)=> {
    /**
     * (/^(?=.*[0-9])=>should contains atleast one digit between 0-9
     * (?=.*[!@#$%^&*])=>should contains alteast one special symbols
     * [a-zA-Z0-9!@#$%^&*]{6,}=>should contains atleast 8 from mentioned character
     */
    if (!password.match(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/g))
      return false
    return true
  }
  /**
   * This handles the blur in input field
   */
  handleBlur = (event) => {
    const target = event.target
    const name = target.name
    const value = target.value
    if (name === 'password') {
      if (!this.state.fields.password) {
        this.setErrors('passwordError', errorMessage.passwordEmpty)
      } else {
        this.setErrors('passwordError', '')
      }
    } else {
      if (!this.state.fields.confirmPassword) {
        this.setErrors('confirmPasswordError', errorMessage.confirmPasswordEmpty)
      } else if (!this.isMatched(this.state.fields.password, value)) {
        this.setErrors('confirmPasswordError', errorMessage.passwordMatch)
      } else {
        this.setErrors('confirmPasswordError', '')
      }
    }
  }

  /**
   * This method handles the request when user submits a form
   */
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.resetPassword(this.state.fields.password)
  }

  render() {
    const password = this.state.fields.password
    const confirmPassword = this.state.fields.confirmPassword
    const isFormValid = password && confirmPassword && this.isMatched(password, confirmPassword)
    return (
      <React.Fragment>
        <h4 className='font-weight-bold text-center'>Set Password</h4>
        <div className='text-secondary text-center'>Set your password to sign in</div>
        <form onSubmit={this.handleSubmit}>
          <div className='row mt-2'>
            <div className='col-sm-12'>
              <div className='form-group'>
                <div className='d-flex justify-content-between align-items-center'>
                  <label>Password</label>
                </div>
                <input
                  type='password'
                  name='password'
                  className={`form-control ${this.state.errors?.passwordError ? 'is-invalid' : ''}`}
                  placeholder='Enter your password'
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                <span className='text-danger'>{this.state.errors?.passwordError}</span>
              </div>
            </div>
          </div>
          <div className='row mt-2'>
            <div className='col-sm-12'>
              <div className='form-group'>
                <div className='d-flex justify-content-between align-items-center'>
                  <label>Confirm Password</label>
                </div>
                <input
                  type='password'
                  name='confirmPassword'
                  className={`form-control ${
                    this.state.errors?.confirmPasswordError ? 'is-invalid' : ''
                  }`}
                  placeholder='Enter your password'
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                <span className='text-danger'>{this.state.errors?.confirmPasswordError}</span>
              </div>
            </div>
          </div>
          <div className='row mt-4'>
            <div className='col-sm-12'>
              {this.props.loader ? (
                <button className='btn btn-primary btn-lg d-block w-100' disabled>
                  {/* <LoaderContainer
                    type={'Circles'}
                    color={'white'}
                    height={15}
                    width={15}
                    visible={true}
                  ></LoaderContainer> */}
                </button>
              ) : (
                <button disabled={!isFormValid} className='btn btn-primary btn-lg d-block w-100'>
                  Set Password
                </button>
              )}
            </div>
          </div>
        </form>
      </React.Fragment>
    )
  }
}

export default ForgotPasswordResetPasswordComponent
