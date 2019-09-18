
/*
    { content, image_urls, image_titles }
*/
function spellContent(props){
    const imgStyle = `margin: auto;max-width: 100%;display: block;padding: 15px 0px;`
    let content = props.content
    if(!content) return ''
    content = content
        .replace(/(<br>)/g,'|~newline~|').replace(/(<br\/>)/g,'|~newline~|')
        .replace(/<\/?.+?>/g,"")
        .replace(/ /g,"")
        .replace(/(\|img\d+\|)/g,'|~image~|')
        // .replace(/(\|pictit\d+\|)/g,'')
        .replace(/(\|pictit\d+\|)/g,'|~title~|')
        .replace(/(\|~newline~\|)/g,'<br/>')
        
    if( props.image_urls) {
        const imageArr = props.image_urls.split(';')
        while(content.indexOf(`|~image~|`) !== -1) {
            const image = imageArr.shift()
            let startIndex = content.indexOf(`|~image~|`)
            content = content.slice(0,startIndex) + `<img src="${image}" style="${imgStyle}"/>` + content.slice(startIndex+9)
        }
    }
    if( props.image_titles) {
        const titleArr = props.image_titles.split('||')
        const title = titleArr.shift()
        while(content.indexOf(`|~title~|`) !== -1) {
            const title = titleArr.shift()
            let startIndex = content.indexOf(`|~title~|`)
            content = content.slice(0,startIndex) + `<div style="padding-bottom:15px;text-align: center;font-weight: bold;">${title}</div>` + content.slice(startIndex+9)
        }
    }
    return content
}
export default spellContent