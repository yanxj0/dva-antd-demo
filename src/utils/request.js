import axios from 'axios'

// 配置 axios 请求头和请求体，允许携带 cookie 发起请求
const axios_config = {
    headers: {
        'Content-Type' : 'application/json',
        // 'Authorization': 'token 0e98da77883076e5edacde0d4849f31690c2132c',
        'Accept':'application/json'
    },
    // withCredentials: true,
    // timeout: 5000
};

const fetchData = (options) => {
    let {
        method = 'get', // 创建请求时使用的方法，默认为 get
        data, // 传入请求参数
        // fetchType,
        url,
    } = options;

   console.log('url:' + url);
    const axioscopy = axios.create(axios_config);

    // 根据请求类型，进行请求
    switch (method.toLowerCase()) {
        case 'get':
            console.log('request get');
            console.log(data);
            return axioscopy.get(url, data);
        case 'post':
            console.log('request post');
            console.log(data);
            return axioscopy.post(url, data);
        case 'delete':
            return axioscopy.delete(url, {
                data: data,
            });
        case 'put':
            console.log('request put');
            console.log(data);
            return axioscopy.put(url, data)
        case 'patch':
            return axioscopy.patch(url, data)
        default:
            return axioscopy(options);
    }
}

export function request (options) {
    console.log('request action');
    console.log(options);

    return fetchData(options).then((response) => {
        console.log('axios call back')
        console.log(response);
        // 对请求返回结果进行解析
        let { status, data }  = response;
        if (status === 200) {
            // 请求成功，且正确返回数据，直接返回需要的结果
            return Promise.resolve({
                status: 1,
                success: true,
                message: data.message,
                data: data
            });
        } else {
            // 请求成功，但是返回数据有情况
            console.log("请求有问题");
            return Promise.reject({
                status: status,
                success: false,
                errorMessage: data.message,
            });
        }
    }).catch((error) => {
        console.log('axios call back error');
        console.log(error);
        return Promise.resolve({
            success: false,
            errorMessage: error
        });
    })
}