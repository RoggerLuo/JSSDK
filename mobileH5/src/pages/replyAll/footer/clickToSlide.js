export default function(props) {
    const elementWithScrollBar = props.commentsRef.parentElement.parentElement.parentElement.parentElement
    if (elementWithScrollBar.scrollTop !== 0) {
        smoothSlide(elementWithScrollBar,0)
    } else {
        const comments = props.commentsRef.children[0].children
        if (comments[0]) {
            smoothSlide(elementWithScrollBar,comments[0].offsetTop-document.body.offsetHeight+58+66)
            /* offsetTop该元素到页面顶部的距离, body.offsetHeight是浏览器可见高度,58是footer遮住的高度，66是第一条评论的高 */
        }
    }
}
function smoothSlide(element,targetTop){
    if(element.scrollTop>targetTop) {
        smoothUp(element)   
    }else{
        smoothDown(element,targetTop)
    }
    function smoothUp(element) {
        const move = function () {
            element.scrollTop = element.scrollTop - 10;
            if (element.scrollTop === 0) {
                clearInterval(time)
            }
        }
        var time = setInterval(move,1)
    }
    function smoothDown(element,target) {
        const move = function () {
            element.scrollTop = element.scrollTop + 10;
            if (element.scrollTop >= target) {
                clearInterval(time)
            }
        }
        var time = setInterval(move,1)
    }
}
