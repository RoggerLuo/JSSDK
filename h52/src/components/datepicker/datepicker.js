import React from 'react';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { connect } from 'dvax';
import styles from './index.less';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

class Datechoose extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      start: this.props.start,
      end: this.props.end,
      format: this.props.format || 'YYYY-MM-DD'
    };
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    if(this.state.start !== nextProps.start)
      this.setState({ start: nextProps.start, end: nextProps.end });
  }

  onChange = (date, dateString) => {
    this.setState({
      start: dateString[0],
      end: dateString[1]
    })
    this.props.onChange && this.props.onChange(dateString[0], dateString[1]);
  }

  dateReset = () => {
    this.setState({
      start: '',
      end: ''
    })
    this.props.onChange && this.props.onChange('', '');
  }

  render() {
    return (
      <div className={styles.datepicker}>
        {
          this.state.start && this.state.end
            ? this.state.start+' —— '+this.state.end
            : <span className={styles.datepickerPlc}>开始时间 —— 结束时间</span>
        }
        {
          this.state.start && this.state.end
            ? <button className={styles.datepickerReset} onClick={this.dateReset}></button>
            : ''
        }
        <RangePicker ref='datepicker'
          locale={locale}
          className={styles.datepickerAntd}
          defaultValue={this.state.start && this.state.end ? [global.moment(this.state.start, this.state.format), global.moment(this.state.end, this.state.format)] : []}
          format={this.state.format}
          onChange={this.onChange} />
      </div>
    );
  }
}

export default Datechoose
