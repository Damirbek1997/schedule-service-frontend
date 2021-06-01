import React, {useState} from 'react';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from './dialog'
import { withRouter } from 'react-router-dom'

const DeleteEditBtn = ({remove, to, userRole, history, callbackRemove }) => {
    const deletedFunc = (value) => {
        callbackRemove(remove)
    }
    const editUser = () => {
        switch(to){
            case 'teacherEdit':
                return history.push({
                    pathname: '/editTeacher',
                    state: { id: remove }
                  })                 
            break;
            case 'studentEdit': 
                return history.push({
                    pathname: '/editStudent',
                    state: { id: remove }
                  })                  
        break;
        case 'subjectEdit':
            return history.push({
                pathname: '/editSubject',
                state: { id: remove }
              })
        }
     
    } ;

    return (
        <div className="btnsFlex"> 
            <Dialog deleted={deletedFunc} userRole={userRole} remove={remove}  />       
          <IconButton onClick={editUser} aria-label="edit"> 
            <EditIcon />
        </IconButton> 
     </div>
    )
}

export default withRouter(DeleteEditBtn)