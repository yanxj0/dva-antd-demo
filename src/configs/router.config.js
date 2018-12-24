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
        id: 'login',
        pid: '0',
        name: '登陆',
        icon:'file-jpg',
        path: '/login',
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

