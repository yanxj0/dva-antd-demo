module.exports = {
    data: [
        {
            id: 'home',
            pid: '0',
            name: '首页',
            icon: 'file-jpg',
            path: '/home',
            display: 'block',
            url: '../routes/base/home'
        },
        {
            id: 'login',
            pid: '0',
            name: '登陆',
            icon: 'file-jpg',
            path: '/login',
            url: '../routes/base/login'
        },
        {
            id: 'notfound',
            pid: '0',
            name: '未找到',
            icon: 'file-jpg',
            path: '*',
            url: '../routes/base/notfound'
        }
    ],
    msg: '操作成功',
    status: 1
}
