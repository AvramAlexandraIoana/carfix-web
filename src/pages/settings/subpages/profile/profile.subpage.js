import React, { useContext } from 'react';
import { Form, Input } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { AppContext } from '../../../../context/app.context';
import { ProfilePageWrapper, InfoWrapper, Button } from './profile.style';
export default function Profile() {
  const [form] = Form.useForm();
  const { user, updateProfile, isLoading } = useContext(AppContext);
  
  const onFinish = (values) => {
    updateProfile(values);
  };

  return (
    <ProfilePageWrapper>
      <InfoWrapper>
        <h2>Schimba-ti profilul</h2>
        <h3>Schimba-ti profilul</h3>
      </InfoWrapper>
      <Form
        form={form}
        name='register'
        onFinish={onFinish}
        scrollToFirstError
        initialValues={{
          Nume: user.user.firstname,
          Prenume: user.user.lastname,
          numar_telefon: user.user.phone,
          email: user.user.email,
        }}
      >
        <Form.Item
          name='Nume'
          label={<span>Nume</span>}
          rules={[
            {
              required: true,
              message: 'Adaugă numele!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='Prenume'
          label={<span>Prenume</span>}
          rules={[
            {
              required: true,
              message: 'Adaugă prenumele!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='numar_telefon'
          label='Număr telefon'
          rules={[{ required: true, message: 'Adaugă numarul de telefon!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='email'
          label='E-mail'
          rules={[
            {
              type: 'email',
              message: 'Email-ul nu e valid',
            },
            {
              required: true,
              message: 'Adaugă un email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='password'
          label='Parola'
          rules={[
            {
              required: true,
              message: 'Adaugă o parola!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name='confirm'
          label='Confirmă parola'
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Confirma parola!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('Parolele nu coincid!');
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type='primary' disabled={isLoading} loading={isLoading} htmlType='submit'>
            Salvează
          </Button>
        </Form.Item>
      </Form>
    </ProfilePageWrapper>
  );
}
