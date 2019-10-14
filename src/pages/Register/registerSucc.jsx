import React from 'react'
import {Link} from 'react-router-dom'
class registerSucc extends React.Component {

    render(){
        return(
            <div className="login_btn">
                <Link to="/login">登录页</Link>
            </div>
        )
    }
}
export default registerSucc