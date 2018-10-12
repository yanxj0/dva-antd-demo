import dva from 'dva';
import createLoading from 'dva-loading';
import { createHashHistory } from 'history';
import './index.css';

import router from './router';

// 1. Initialize
const app = dva({
    ...createLoading({
        effects: true,
    }),
    history: createHashHistory(),
    onError () {

    }
})

app.use(createLoading())

// 2. Model
// app.model()

// 3. Router
app.router(router)


// 4. Start
app.start('#root')
