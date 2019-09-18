
/* 手动import: 路由侧栏的icon在 "indexPage/Aside/icon.less"中修改 */

export const routes = [
    {
        name: 'subject',
        path: '/home/subject',
        isShowInAside: true,
        // notNeedRoute: true,
        title: '板块管理',
        component: require('pages/subject').default,
        subRoutes:[
            {
                path: '/home/subject/add',
                component: require('pages/subject/detail').default,
                title: '新增板块'
            },
            {
                path: '/home/subject/edit/:subjectId',
                component: require('pages/subject/detail').default,
                title: '编辑板块'
            },
        ]
    },
    {
        name: 'post',
        path: '/home/post',
        isShowInAside: true,
        // notNeedRoute: true,
        title: '帖子管理',
        component: require('pages/post').default,
        subRoutes:[
            {
                path: '/home/post/add',
                component: require('pages/subject/detail').default,
                title: '新增板块'
            },
            {
                path: '/home/subject/edit/:subjectId',
                component: require('pages/subject/detail').default,
                title: '编辑板块'
            },
        ]
    },
    {
        name: 'comments',
        path: '/home/comments',
        isShowInAside: true,
        // notNeedRoute: true,
        title: '留言管理',
        component: require('pages/comment').default,

    },
    {
        name: 'sensitive',
        path: '/home/sensitive',
        isShowInAside: true,
        // notNeedRoute: true,
        title: '敏感字',
        component: require('pages/sensitive').default,
    },
    {
        name: 'ban',
        path: '/home/ban',
        isShowInAside: true,
        // notNeedRoute: true,
        component: require('pages/ban').default,

        title: '用户禁言',
        subRoutes:[
            {
                path: '/home/ban/add',
                component: require('pages/ban/detail').default,
                title: '新增禁言用户'
            },
        ]
    },
    // {
    //     name: 'searchwords',
    //     path: '/home/searchwords',
    //     isShowInAside: true,
    //     // notNeedRoute: true,
    //     title: '热门搜索词',
    // }
]