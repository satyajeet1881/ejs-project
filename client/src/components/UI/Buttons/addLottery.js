import React, { useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { Modal } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import { storageActions } from '../../../actions';
import restActions from '../../../actions/rest';
import NotificationMessage from '../../../notification/NotificationMessage';


export const AddLottery = (props) => {
    console.log("props",props)
    const [inputs, setInputs] = useState(props.inputs);
    const [publishDate, setDate] = useState(props.publishDate??new Date());
    
    const [errors, setError] = useState({});
    const handleDateChange = (date) => {
        console.log("date",date)
        setDate(date)

    }
    console.log("publishDate",publishDate,props.inputs)
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
        console.log('save lottery Name', { ...inputs, publishDate: publishDate })
        if(!inputs.id){
            saveLottery({ ...inputs, publishDate: publishDate },config)
        }else{
            updateLottery({ ...inputs, publishDate: publishDate },inputs.id,config)
        }
   
     
   
    }


    const saveLottery= (body,config)=>{
        const lotteryUrl = `/admin/lottery`
        restActions.POST(lotteryUrl, body, config).then((res) => {
            if (res?.data?._id) {
                NotificationMessage.showInfo('Lottery Saved!')
                props.handleClose()
                props.fetchData()
            }
        },
            (err) => {
                if (err?.status === 401) {
                    NotificationMessage.showError('Invalid user to save information!')
                } else {
                    NotificationMessage.showError(err.message)
                }
            },
        )
    }
    const updateLottery= (body,id,config)=>{
        const lotteryUrl = `/admin/lottery/${id}`
        restActions.PUT(lotteryUrl, body, config).then((res) => {
            NotificationMessage.showInfo('Lottery Updated!')
            props.handleClose()
            props.fetchData()
        },
            (err) => {
                if (err?.status === 401) {
                    NotificationMessage.showError('Invalid user to save information!')
                } else {
                    NotificationMessage.showError(err.message)
                }
            },
        )
    }

    return (
        <Modal show={props.showAddLotteryModel} backdrop='static' centered  >
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
                <div className='mt-2'>
                    <div className='col-sm-12'>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group row'>
                                <label className='col-sm-4 col-form-label'>Lottery name</label>
                                <div className="col-sm-8">
                                    <input
                                        maxLength={'64'}
                                        type='text'
                                        name='lotteryName'
                                        className={`form-control ${errors?.lotteryNameError ? 'is-invalid' : ''}`}
                                        // onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={inputs.lotteryName}
                                        placeholder='Enter name'
                                    />
                                </div>
                                <span className='text-danger'>{errors?.lotteryNameError}</span>
                            </div>
                            <div className='form-group row'>
                                <label className='col-sm-4 col-form-label'>Code</label>
                                <div className="col-sm-8">
                                    <input
                                        type="number"
                                        name="code"
                                        value={inputs.code}
                                        className={`form-control ${errors?.codeError ? 'is-invalid' : ''}`}
                                        onChange={handleChange}
                                        timeIntervals={1}
                                        locale="pt-BR"
                                        placeholder='Enter code for lottry'
                                    />
                                </div>
                                <span className='text-danger'>{errors?.codeError}</span>
                            </div>
                            <div className='form-group row'>
                                <label className='col-sm-4 col-form-label'>Publish Date </label>
                                <div className="col-sm-8">
                                    <DatePicker
                                   selected={publishDate}
                                   onChange={handleDateChange}
                                   name="publishDate"
                                   className={`form-control ${errors?.publishDateError ? 'is-invalid' : ''}`}
                                   timeInputLabel="Time:"
                                   timeFormat="h:mm"
                                   dateFormat="MM/dd/yyyy hh:mm aaaaa'm "
                                   showTimeInput
                                    /> </div>
                                <span className='text-danger'>{errors?.publishDateError}</span>
                            </div>
                            <div className='text-center mt-5'>
                                <button type='submit' className='btn btn-primary px-5'>
                                    {inputs.id?"Update":"Add"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}