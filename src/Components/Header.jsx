import React from 'react'
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { withRouter } from 'react-router-dom'


const Header = ({lastname,firstname, history}) => {
    const logOut = () => {
        localStorage.removeItem("userToken")
        history.push('/')
    }
    return (
        <div className="header ">
            <div className="logo">
                 <img src="" className="logo-img" alt=""/>
                 <h3 className="logo-title">Schedule service</h3>
                 <span></span>
            </div>
            <div className="header-btn">
                <span className="header_admin_info"> <img className="MuiSvgIcon-root-a" src="./user.png" /> {firstname} {lastname}</span>
                <button onClick={logOut} className="header_log_out log_out"><ExitToAppIcon  className="MuiSvgIcon-root-l "/> Log out</button>
            </div>
        </div>

    )
}

export default withRouter(Header)