import appConfig from '@/config/app';
import { Button, Form, Input, notification } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type FieldType = {
    email?: string;
    password?: string;
    fullname?: string;
};

export const Register = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const onFinish = (values: any) => {
        setLoading(true)
        const { email, password } = values
        axios.post(`${appConfig.apiUrl}/auth/register`, {
            email: email,
            password: password
        })
            .then(function (response) {
                notification.success({
                    message: "Thành Công",
                    description: "Đăng ký tài khoản thành công",
                    key: "success",
                    duration: 2,
                })
                setTimeout(() => {
                    navigate('/login')
                }, 2000);
            })
            .catch(function (error) {
                setLoading(false)
                notification.error({
                    message: "Đã có lỗi xảy ra",
                    description: "Đăng ký không thành công vui lòng liên hệ Hà DT",
                    key: "err",
                    duration: 3,
                })

            });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div className='m-auto max-w-[500px] mt-[200px]'>
            <h1 className='text-center'>Đăng ký tài khoản</h1>
            <Form
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout='vertical'
            >

                <Form.Item<FieldType>
                    label="email"
                    name="email"
                    rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email' }]}
                >
                    <Input type='email' prefix={<i className="fa-solid fa-envelope"></i>} />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                    className='mt-6'
                >
                    <Input.Password prefix={<i className="fa-solid fa-lock"></i>} />
                </Form.Item>

                <Form.Item className='text-center'>
                    <Button loading={loading} type="primary" htmlType="submit">
                        Đăng ký
                    </Button>
                </Form.Item>
            </Form>
            <span>Bạn đã có tài khoản? <Link to={'/login'}>Đăng nhập ngay</Link></span>
        </div>
    )
}
