import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { connect } from 'dva'

import '@style/login.less'

const FormItem = Form.Item

const Login = ({
    login,
    dispatch,
    form: { getFieldDecorator, validateFields }
}) => {
    function handleSubmit(e) {
        e.preventDefault()
        validateFields((err, values) => {
            if (!err) {
                dispatch({
                    type: 'login/checkLogin',
                    payload: values
                })
            }
        })
    }

    return (
        <div className="login-container">
            <div className="form-container">
                <Form onSubmit={handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your username!'
                                }
                            ]
                        })(
                            <Input
                                prefix={
                                    <Icon
                                        type="user"
                                        style={{ color: 'rgba(0,0,0,.25)' }}
                                    />
                                }
                                placeholder="Username"
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your Password!'
                                }
                            ]
                        })(
                            <Input
                                prefix={
                                    <Icon
                                        type="lock"
                                        style={{ color: 'rgba(0,0,0,.25)' }}
                                    />
                                }
                                type="password"
                                placeholder="Password"
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true
                        })(<Checkbox>Remember me</Checkbox>)}
                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            Log in
                        </Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    )
}

Login.propTypes = {
    form: PropTypes.object,
    app: PropTypes.object,
    dispatch: PropTypes.func
}

export default connect(({ login }) => ({
    login
}))(Form.create()(Login))
