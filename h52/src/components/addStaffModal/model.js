import React from "react"
import { Model } from 'dvax'
// import moment  from "moment"
import './model'
const initState = {
    treeDisplayData:[],
    employees:[],        
    orgData:[],
    selected_employees:[],
    loadingTree:false,
    loadingEmployees: false,
    searchText:'',
    orgPath:'',
    currentOrgId:''

}
Model.create({
    namespace:'addStaffModal',
    state:initState,
    reducers:{
        clear(state){
            return initState
        }
    }
})
