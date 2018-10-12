import React from 'react';
import ProTypes from 'prop-types';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import Routes from '@configs/router.config'

export default function Routers({ history }) {
    return (
        <LocaleProvider locale={zhCN}>
            <Routes {...history}/>
        </LocaleProvider>
    )
}

Routers.ProTypes = {
    history: ProTypes.object
}