import { format } from "date-fns";
import React from "react";


const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
    return (
        <tr style={{textAlignLast: 'center'}} >
            <td style={{ width: '100%', align: 'center' }}>{contact.lotteryName}</td>
            <td style={{ width: '100%', align: 'center' }}>{contact.code}</td>
            <td style={{ width: '100%', align: 'center' }}>{format(new Date(contact.publishDate), "dd-MM-yyyy hh:mm aaaaa'm'")}</td>
            <td style={{ width: '100%', align: 'center' }}>
                <button
                    className='btn btn-primary'
                    onClick={(event) => handleEditClick(event, contact)}
                >
                    Edit
                </button>
                <button style={{margin:10}}   className='btn btn-danger' type="button" onClick={() => handleDeleteClick(contact._id)}>
          Delete
        </button>
            </td>
        </tr>
    );
};

export default ReadOnlyRow;
