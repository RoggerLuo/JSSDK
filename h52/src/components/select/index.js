import React from "react"
import styles from './index.less'
import { Select } from 'antd'
const Option = Select.Option
function SelectCom({placeholder,value,handleChange,options,width}){
    return (
        <div className={styles.select} style={width === '100%' ? {width: '100%'} : null}>
            <Select 
                className={styles.selectAntd}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
            >
                {options.map(opt => (<Option key={opt.key} value={opt.key}>{opt.text}</Option>))}
            </Select>
        </div>
    )
}
export default SelectCom
