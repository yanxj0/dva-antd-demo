import { request } from '../utils/request'

const apiUrl = 'https://api.github.com'

export const getJS = params =>
    request({
        data: { params },
        url: `${apiUrl}/search/repositories`
    })
