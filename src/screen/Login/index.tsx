import appConfig from '@/config/app';
import { localStore } from '@/util/LocalStore';
import { Button, Form, Input, notification } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type FieldType = {
  email?: string;
  password?: string;
};

export const Login = () => {
  const [loading, setLoading] = useState(false)
  const onFinish = (values: any) => {
    setLoading(true)
    const { email, password } = values
    axios.post(`${appConfig.apiUrl}/auth/authenticate`, {
      email: email,
      password: password
    })
      .then(function (response) {
        console.log(response);
        localStore.setItem("loginSession", response.data.token)
        axios.get(`${appConfig.apiUrl}/user/detail`, {
          headers: {
            Authorization: `Bearer ${response.data.token}`
          }
        }).then((response) => {
          localStore.setJson("loggedUser", response.data)
          location.href = '/'
        }).catch((error) => { })
      })
      .catch(function (error) {
        console.log(error);
        
        setLoading(false)
        notification.error({
          message: "Đã có lỗi xảy ra",
          description: "Đăng nhập không thành công vui lòng liên hệ Hà DT",
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
      <h1 className='text-center'>Trang login</h1>
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
          rules={[{ required: true, message: 'Vui lòng nhập email' }]}
        >
          <Input prefix={<i className="fa-solid fa-envelope"></i>} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
          className='mt-6'
        >
          <Input.Password prefix={<i className="fa-solid fa-lock"></i>} />
        </Form.Item>

        <Form.Item className='text-center'>
          <Button loading={loading} type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
      <span>Bạn chưa có tài khoản? <Link to={'/register'}>Đăng ký</Link></span>
    </div>
  )
}
