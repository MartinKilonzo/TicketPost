import React from 'react';

class DateComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let date = new Date(this.props.date);
    date = months[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear();
    return (
       <div>{date}</div>
    );
  }
}

DateComponent.defaultProps = {};

export default DateComponent;
