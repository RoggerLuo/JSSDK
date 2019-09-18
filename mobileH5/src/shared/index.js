// import { Model } from 'dvax'

export function routeTo(pageName,query){
    window.mainView.router.load({
        url: `${pageName}.html`,
        query:query||{}
    })
}

