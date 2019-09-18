
import React from 'react';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { connect } from 'dvax';
import styles from './index.less';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

class Datechooses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: this.props.date,
      // end: this.props.end,
      // format: this.props.format || 'YYYY-MM-DD'
    };
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    if(this.state.date !== nextProps.date)
      this.setState({ date: nextProps.date});
  }

  onChange = (date, dateString) => {
    this.setState({
      date: dateString
    })
    this.props.onChange && this.props.onChange(dateString);
    
        
  }

  // dateReset = () => {
  //   this.setState({
  //     date: ''
   
  //   })
  //   this.props.onChange && this.props.onChange('', '');
  // }

  render() {
    return (
      <div className={styles.datepicker}>
        {
          this.state.date
            ? this.state.date
            : <span className={styles.datepickerPlc}>选择日期</span>
        }
       
        <DatePicker ref='datepicker'
          locale={locale}
          className={styles.datepickerAntd}         
          onChange={this.onChange} />
      </div>
    );
  }
}

export default Datechooses
