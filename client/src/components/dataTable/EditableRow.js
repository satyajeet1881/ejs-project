import { format } from "date-fns";
import React from "react";

const EditableRow = ({
    editFormData,
    handleEditFormChange,
    handleCancelClick,
}) => {
    return (
        <tr>
            <td>None Editable</td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter a name..."
                    name="fullName"
                    value={editFormData.lotteryName}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter an new code"
                    name="address"
                    value={editFormData.code}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter a phone number..."
                    name="phoneNumber"
                    value={format(new Date(editFormData.publishDate), 'dd-MM-yyyy')}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td style={{ width: '100%', textAlign :'center' }}>
                <button className='btn btn-primary mr-2 ' type="submit">Save</button>
                <button className='btn btn-primary' onClick={handleCancelClick}>
                    Cancel
                </button>
            </td>
        </tr>
    );
};

export default EditableRow;