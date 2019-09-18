# Search bar

## 传入参数
###callback*({fetch,change,...opt},inputValue)
attention: cb是一个generator  
第二个参数是输入的值

###getContent(close)
close是关闭面板的方法

###placeholder
placeholder
## Code Sample
```javascript
import Bar from './searchBar'

function SearchBar({}){
    const getContent = close => {
        return (<div onClick={close}>abcd</div>)
    }
    const callback = function*({change},inputValue){
        console.log(inputValue) 
    }
    return (<Bar getContent={getContent} callback={callback} placeholder={"请输入关键字搜索作者"}/>)
}

```