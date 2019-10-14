import React from 'react'
class Item extends React.Component {
    changeLangFn(event){
        let val = event.target.innerText.trim() ;
      this.props.getLang(val)
    }
    render(){
        return(
            <div>
              <li  className="list_li" 
                  value={this.props.item.value}  
                  onClick={this.changeLangFn.bind(this)}>
                  <img src={this.props.item.img} alt="" /> {this.props.item.label}
              </li>      
            </div>
        )
    }
}
export default Item