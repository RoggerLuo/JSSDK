import React from 'react'
import {Model} from 'dvax'
import { Message,Input} from 'antd'
const FormComp = (props) => {
    return(
        <div>
            <Input.TextArea
                rows={10}
                placeholder="输入多个敏感词请换行"
                onChange={value => {
                    Model.change('addWordModal','text',value.target.value)
                }}
                style={{ width: '100%' }}
            />
        </div>
    )
}
export default Model.connect(['addWordModal'])(FormComp)
