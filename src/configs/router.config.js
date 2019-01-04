export const routers = [
    {
        id: 'home',
        pid: '0',
        name: '首页',
        icon:'file-jpg',
        path: '/home',
        display: 'block',
        component: () => import('../routes/base/home')
    },
    {
        id: 'film',
        pid: '0',
        name: '电影',
        icon:'file-jpg',
        path: '/film',
        display: 'block',
        component: ''
    },
    {
        id: 'europeAmerica',
        pid: 'film',
        name: '欧美电影',
        icon:'file-jpg',
        path: '/film/europeAmerica',
        display: 'block',
        models: () => [import('../models/film')],
        component: () => import('../routes/film/europeAmerica')
    },
    {
        id: 'hongkong',
        pid: 'film',
        name: '香港电影',
        icon:'file-jpg',
        path: '/film/hongkong',
        display: 'block',
        models: () => [import('../models/film')],
        component: () => import('../routes/film/hongkong')
    },
    {
        id: 'login',
        pid: '0',
        name: '登陆',
        icon:'file-jpg',
        path: '/login',
        models: () => [import('../models/login')],
        component: () => import('../routes/base/login')
    },
    {
        id: 'notfound',
        pid: '0',
        name: '未找到',
        icon:'file-jpg',
        path: '*',
        component: () => import('../routes/base/notfound')
    },
]

const update = function(old, value) {
    return old = old ? old.add(value) : new Set([value]);
}

export const menus = (() => {
    let byId = new Map();
    let byPid = new Map();
    routers.map((item) => {
        byId.set(item.id, item);
        byPid.set(item.pid, update(byPid.get(item.pid), item));
    });
    return {'byId':byId, 'byPid':byPid};
})();

