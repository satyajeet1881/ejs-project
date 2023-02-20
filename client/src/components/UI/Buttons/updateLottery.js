import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { storageActions } from '../../../actions';
import restActions from '../../../actions/rest';
import NotificationMessage from '../../../notification/NotificationMessage';

export const UpdateLottery = (props) => {
    const [inputs, setInputs] = useState({});
    const [errors, setError] = useState({});
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const token = storageActions.getItem('token')
        let config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
        console.log('save Lottry full data', { ...inputs })
        const lotteryUrl = `/admin/lotteryName`
        restActions.POST(lotteryUrl, { ...inputs }, config).then((res) => {
            if (res?.data?.n) {
                NotificationMessage.showInfo('Lottery Saved!')
                props.handleClose()
            }
        },
            (err) => {
                if (err?.status === 401) {
                    NotificationMessage.showError('Invalid user to save informations!')
                } else {
                    NotificationMessage.showError(err.message)
                }
            },
        )
    }
    return (
        <Modal show={props.showAddLotteryModel} backdrop='static' centered onHide={() => props.handleClose()}>
            <div className='modal-header'>
                <h5 className='modal-title font-weight-bold'>Add New Lottery</h5>
                <button
                    onClick={props.handleClose}
                    type='button'
                    className='close custome-close'
                    data-dismiss='modal'
                    aria-label='Close'
                >
                    <span aria-hidden='true'>×</span>
                </button>
            </div>
            <Modal.Body>
                <div className='row mt-2'>
                    <div className='col-sm-12'>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group row'>
                                <label className='col-sm-4 col-form-label'>Lottery name</label>
                                <div class="col-sm-8">
                                    <input
                                        maxLength={'64'}
                                        type='text'
                                        name='lotteryName'
                                        className={`form-control ${errors?.nameError ? 'is-invalid' : ''}`}
                                        // onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={inputs.lotteryName}
                                        placeholder='Enter name'
                                    />
                                </div>
                                <span className='text-danger'>{errors?.nameError}</span>
                            </div>
                            <div className='text-center mt-5'>
                                <button type='submit' className='btn btn-primary px-5'>
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}