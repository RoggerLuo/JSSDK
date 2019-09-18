import {Message} from 'antd'
export function*getOrgById({fetch,orgId}){
    const res = yield fetch(`subject-setting/org`,{query:{orgId}})
    // if(res.hasErrors) {
    //     Message.error('接口出错')
    //     return [{}]
    // }
    const org = res.results[0] //res.data[0] 
    // pathname拼装
    // org.pathname = (org.parent_org_name && org.parent_org_name + '-' || '') + org.name
    // debugger
    return org
}
export function*getOrgData({fetch}){
    const res = yield fetch(`subject-setting/org`)
    // if(res.hasErrors) {
    //     Message.error('接口出错')
    //     return [{}]
    // }
    return res.results // 标准 org view返回的组织机构树
}
export function*getEmployeesOfOrg({fetch,orgId}){
    const res = yield fetch(`subject-setting/employees`,{query:{orgId}})
    // if(res.hasErrors) {
    //     Message.error('接口出错')
    //     return [{}]
    // }
    return res.results.data//res.data[0].employees
}
export function*searchEmployees({fetch,keyword}){
    const res = yield fetch(`subject-setting/search-employee`,{query:{keyword}})
    // if(res.hasErrors) {
    //     Message.error('接口出错')
    //     return [{}]
    // }
    return res.results
}