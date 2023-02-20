import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/js/dist/modal";
import "react-datepicker/dist/react-datepicker.css";
import { AddLottery } from './UI/Buttons/addLottery';
import { UpdateLottery } from './UI/Buttons/updateLottery';
import ReadOnlyRow from './dataTable/ReadOnlyRow';
import EditableRow from './dataTable/EditableRow';
import restActions from '../actions/rest';
import { format } from 'date-fns';
import { storageActions} from '../actions';
import NotificationMessage from '../notification/NotificationMessage';
import { confirmAlert } from 'react-confirm-alert'
export const Dashboard = (props) => {
    const [openAddLotteryModel, setAddLotteryFlag] = useState(false)
    const [openLotteryNameModel, setSaveLotteryNameFlag] = useState(false)
    const [allLotteries, setAllLotteries] = useState([])
    const [inputs, setInputs] = useState({publishDate: new Date()})

    const fetchData = async () => {
        const url = '/admin/lottery'
        const key = 'publishDate'
        try {
            const { data: lotteries } = await restActions.GET(url)
            console.log('dash board Actual count', lotteries.length)
            const arrayUniqueByKey = [...new Map(lotteries.map(item =>
                [item[key], item])).values()];
            setAllLotteries(arrayUniqueByKey)
            // filterData(arrayUniqueByKey)
            console.log('Unique count', arrayUniqueByKey)
        } catch (exception) {
            //   setHomeData([])
            console.log('Unable to load data!!', exception)
        }

    }

    useEffect(() => {
        fetchData();
    }, [])


    //edit click handle
    const handleEditClick = (event, lottery) => {
        event.preventDefault(); // ???
        setInputs({
            lotteryName: lottery.lotteryName,
            code: lottery.code,
            publishDate: lottery.publishDate,
            id:lottery._id
        })
        setAddLotteryFlag(true)

        
    };

    const deleteLottery= (id)=>{
        const token = storageActions.getItem('token')
        let config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }

        const lotteryUrl = `/admin/lottery/${id}`

        confirmAlert({
            message: "Are you sure you want to delete it ",
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
             
                    restActions.DELETE(lotteryUrl,{}, config).then((res) => {
                        NotificationMessage.showInfo('Lottery Delete')
                         fetchData()
                    },
                        (err) => {
                            if (err?.status === 401) {
                                NotificationMessage.showError('Invalid user to save information!')
                            } else {
                                NotificationMessage.showError(err.message)
                            }
                        }
                    )
                },
              },
              {
                label: 'No',
              },
            ],
          })


       
        
    }

    // delete
    const handleDeleteClick = (lotteryId) => {
        deleteLottery(lotteryId)
    };

    return (
        <>
            <div className='container mt-5' style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <div className='row'>
                    <button className='btn btn-primary' onClick={() => setAddLotteryFlag(true)}> Add New Lottery </button>
                </div>
                <div className='row'>
                    <button className='btn btn-primary' onClick={() => setSaveLotteryNameFlag(true)}> Update Lottery Name </button>
                </div>
                {openAddLotteryModel && <AddLottery fetchData={()=>{fetchData()}} inputs={inputs}  showAddLotteryModel={openAddLotteryModel} handleClose={() => {
                    setAddLotteryFlag(false)
                }} />}
                {openLotteryNameModel &&
                    <UpdateLottery showAddLotteryModel={openLotteryNameModel} handleClose={() => {
                        setSaveLotteryNameFlag(false)
                    }} />}
                {/*    */}
            </div>
            <br></br>
            <div className='app-container'> 
            <table className='table table-light table-striped table-bordered'>
                        <thead className='thead-light'>
                            <tr style={{textAlignLast: 'center'}}>
                                <th  className='bg-primary'>Name</th>
                                <th  className='bg-primary'>Code</th>
                                <th  className='bg-primary'>Publish Date</th>
                                <th className='bg-primary'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allLotteries && allLotteries.length && allLotteries.map((lottery) => (
                                <>
                                  <ReadOnlyRow
                                            contact={lottery}
                                            handleEditClick={handleEditClick}
                                            handleDeleteClick={handleDeleteClick}
                                        />
                                </>
                            ))}
                        </tbody>
                    </table>

            </div>
        </>
    )
}
// export default Dashboard

