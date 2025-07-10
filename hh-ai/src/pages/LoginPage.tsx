import React from 'react';
import {Form, Input, Button, Typography} from 'antd';
import {useNavigate} from "react-router";
import {login} from "../api/auth";



const LoginPage: React.FC = () => {
    const navigate  = useNavigate()
    const [form] = Form.useForm();
    const [error, setError] = React.useState('');

    const handleFinish = (values: any) => {
        void login(values, navigate, setError)
    };

    return (
        <div style={{ maxWidth: 400, margin: '0 auto', padding: '20px' }}>
            <h1>Вход</h1>
            {error && <Typography.Paragraph type={"danger"}>{error}</Typography.Paragraph>}
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                initialValues={{ email: '', password: '', confirmPassword: '' }}
            >
                <Form.Item
                    label="Электронная почта"
                    name="email"
                    rules={[{ required: true, message: 'Пожалуйста, введите вашу почту' }]}
                >
                    <Input placeholder="Введите почту" />
                </Form.Item>
                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Пожалуйста, введите пароль' }]}
                >
                    <Input.Password placeholder="Введите пароль" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginPage;
