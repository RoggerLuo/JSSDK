import * as React from "react";
export interface HelloProps { compiler: string; framework: string; }

import {observable} from 'mobx'
import { observer } from 'mobx-react'
/* model定义 */
const appState = observable({
    timer: 0,
    data:[
        {name:'a'},
        {name:'b'},
        {name:'c'},
    ]
})
// export const Hello = (props: HelloProps) => <h1>Hello from {props.compiler} and {props.framework}!</h1>;
const testRequest = async () => {
    await new Promise(resolve => {
        setTimeout(()=>resolve(123),2000)
    })
    alert(999)
}
const testArrowFunction = () :void => {
    new Promise(resolve => {
        setTimeout(()=>resolve(123),2000)
    })
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
@observer
export class Hello extends React.Component<HelloProps, {}> {
    async componentDidMount()  {
        await new Promise(resolve => {
            setTimeout(()=>resolve(123),2000)
        })
    }
    render() {
        return (
            <div>
                <h1 onClick={()=>appState.data.push({name:String(Date.now())})}>Hello from {this.props.compiler} and {this.props.framework}! </h1>
                {appState.data.map((el,ind)=>{
                    return <div key={ind} onClick={()=>appState.data.splice(ind,1)}> {el.name} </div>
                })}
                <div onClick={testRequest}>testRequest</div>
            </div>
        )
    }
}

/* 
function observable(target, name, descriptor) {
    var v = descriptor.initializer.call(this);
    // 如果值是对象，为其值也创建observable
    if(typeof (v) === 'object') {
        createObservable(v);
    }
    var observable = new Observable(v);
    return {
        enumerable: true,
        configurable: true,
        get: function() {
            return observable.get();
        },
        set: function(v) {
            if(typeof (v) === 'object') {
                createObservable(v);
            }
            return observable.set(v);
        }
    };

};
 */