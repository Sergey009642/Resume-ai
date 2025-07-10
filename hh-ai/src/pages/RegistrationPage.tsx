import React from 'react';
import {Form, Input, Button, Typography} from 'antd';
import {useNavigate} from "react-router";

const RegistrationPage: React.FC = () => {
    const navigate  = useNavigate()
    const [form] = Form.useForm();
    const [error, setError] = React.useState('');

    const handleFinish = (values: any) => {
        fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        })
            .then(async (response) => {
                const responseData = await response.json()
                if (response.ok) {
                    localStorage.setItem("access_token", responseData.access_token);
                    navigate("/")
                } else {
                    setError(responseData.error)
                }
            })
            .catch(() => {
                setError("Ошибка регистрации")
            });
    };

    return (
        <div style={{ maxWidth: 400, margin: '0 auto', padding: '20px' }}>
            <h1>Регистрация</h1>
            {error && <Typography.Paragraph type={"danger"}>{error}</Typography.Paragraph>}
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                initialValues={{ email: '', password: '', confirmPassword: '' }}
            >
                <Form.Item
                    label="Фамилия"
                    name="lastName"
                    rules={[{ required: true, message: 'Пожалуйста, введите вашу фамилию' }]}
                >
                    <Input placeholder="Введите фамилию" />
                </Form.Item>
                <Form.Item
                    label="Имя"
                    name="firstName"
                    rules={[{ required: true, message: 'Пожалуйста, введите ваше имя' }]}
                >
                    <Input placeholder="Введите имя" />
                </Form.Item>
                <Form.Item
                    label="Отчество"
                    name="middleName"
                    rules={[{ message: 'Пожалуйста, введите ваше отчество' }]}
                >
                    <Input placeholder="Введите отчество (при наличии)" />
                </Form.Item>
                <Form.Item
                    label="Электронная почта"
                    name="email"
                    rules={[{ required: true, message: 'Пожалуйста, введите вашу почту' }]}
                >
                    <Input placeholder="Введите почту" />
                </Form.Item>
                <Form.Item
                    label="О себе"
                    name="about"
                    rules={[{ required: true, message: 'Пожалуйста, кратко опишите род деятельности' }]}
                >
                    <Input placeholder="Введите данные" />
                </Form.Item>
                <Form.Item
                    label="Телефон"
                    name="phone"
                    rules={[{ required: true, message: 'Пожалуйста, введите ваш номер телефона' }]}
                >
                    <Input placeholder="Введите номер телефона" />
                </Form.Item>
                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Пожалуйста, введите пароль' }]}
                >
                    <Input.Password placeholder="Введите пароль" />
                </Form.Item>
                <Form.Item
                    label="Подтвердите пароль"
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                        { required: true, message: 'Пожалуйста, подтвердите пароль' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Пароли не совпадают!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Повторите пароль" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Зарегистрироваться
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default RegistrationPage;
