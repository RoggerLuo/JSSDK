
function getRouteArr(location,routesConfig){
    const pathArr = location.pathname.split('/')
    /* location.pathname:
        "/home/class/info"
        ["", "home", "class", "info"] 
    */
    if(pathArr.length <= 2) return []

    const routeArr = []
    const primaryPath = pathArr.slice(0,3).join('/') //  /home/class
    const primaryRoute = routesConfig.find(el=>el.path===primaryPath) 
    if(primaryRoute) {
        routeArr.push(primaryRoute) //path匹配就添加
    }

    const hasSubRoute = pathArr.length > 3
    if(hasSubRoute) {
        for (let index = 4; index <= pathArr.length; index++) {
            const SubPath = pathArr.slice(0,index).join('/') //  /home/class/info
            if(primaryRoute.subRoutes) {
                const subRoute = primaryRoute.subRoutes.find(el => {
                    return el.path.indexOf(SubPath) !== -1
                })
                if(subRoute) {
                    routeArr.push(subRoute) //path匹配就添加
                }    
            }
        }
    }
    return routeArr
}
export default getRouteArr
