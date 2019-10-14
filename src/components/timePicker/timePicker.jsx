import React from 'react';
import { DatePicker, List } from 'antd-mobile';
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
class TimePicker extends React.Component {
    state = {
        date: now,
        time: now
      }
    render(){
        return(
            <div>
                <DatePicker
                    mode="date"
                    title="Select Date"
                    extra="Optional"
                    value={this.state.date}
                    onChange={date => this.setState({ date })}
                    >
                    <List.Item arrow="horizontal">Date</List.Item>
                </DatePicker>    

            </div>
        )
    }
}
export default TimePicker