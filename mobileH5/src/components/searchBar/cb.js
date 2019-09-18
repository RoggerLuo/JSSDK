import React from 'react'
import searchPng from './search.png'
import styled from 'styled-components'
import inputx from 'dvax/inputx'
import debounce from 'dvax/debounce'
const search = debounce(function(run,generator,newVal) {
    run(function*(args) { //{ fetch, get, change }
        if(generator) {
            yield generator(args,newVal)            
        }
        yield args.change('showPanel', true)
    })
}, 500)

const cb = (generator,run) => (newVal, oldVal) => {
    if (newVal !== oldVal) { // 失去焦点也会调用一次，要屏蔽掉
        // if (newVal !== '') {
            search(run,generator,newVal)
        // }
    }
    return newVal
}
export default cb