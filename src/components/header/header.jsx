import React from 'react'
import '../../style/header.scss'
class Header extends React.Component {
    
    handleBack = () => {
        //调用父组件的 goback方法
        this.props.goBack()
      }
    render() {
        return(
                <header id="header_top">
                   <div className="head_back" onClick={this.handleBack}>
                      <img src={require("../../assets/images/register/back-btn.png")} alt="" />
                       <span>{this.props.title}</span>
                   </div>
                   <div></div>
                </header>
           
        )
    }
}

export default Header