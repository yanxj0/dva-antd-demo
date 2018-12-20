export const routers = [
    {
        id: 'index',
        pid: '0',
        path: '/',
        component: ''
    },
    {
        id: 'index-home',
        pid: 'index',
        path: '/home',
        component: () => import('../routes/base/home')
    },
    {
        id: 'login',
        pid: '0',
        path: '/login',
        component: () => import('../routes/base/login')
    },
    {
        id: 'notfound',
        pid: '0',
        path: '*',
        component: () => import('../routes/base/notfound')
    },
]

