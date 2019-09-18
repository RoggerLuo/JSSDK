/**
  将时间转换为时分
*/
import moment from 'moment'

export function convertToHM(time) {
	var minute = parseInt(time / 60);
	var hour = parseInt(minute / 60);
    minute = parseInt(minute % 60);
    
    const format = 'HH:mm'
    


	return moment(hour + ':' + minute, format)
	return {
		'hour': hour,
		'minute': minute
	}
}

/**
	将时分转换为秒
*/
export function convertToTime(hour, minute) {
	return (hour * 60 * 60) + (minute * 60)
} 