import React, { useContext } from 'react';
import { AppContext } from '../../context/app.context';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import { Form, Input, Button as AntButton } from 'antd';

import {
	RegisterPageWrapper,
	LogoWrapper,
	Button,
	CreateAccountWrapper,
	ForgotPassWrapper,
} from './register.style';
import { FancyHeader, Logo } from '../../components';
export default function RegisterPage() {
	const { user, isLoading, register } = useContext(AppContext);
	let history = useHistory();

	let onFinish = formData => {
		register(formData);
	};

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo);
	};

	if (user) {
		return <Redirect to="/dashboard" />;
	}
	return (
		<RegisterPageWrapper>
			<LogoWrapper>
				<Logo />
			</LogoWrapper>

			<FancyHeader
				title="Inregistreaza-te"
				subtitle="Creaza un cont gratuit in cateva secunde!"
			/>
			<Form
				name="basic"
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}>
				<Form.Item
					name="phone_number"
					rules={[
						{
							required: true,
							message: 'Adaugă un numar de telefon!',
						},
					]}>
					<Input placeholder="Numar de telefon" />
				</Form.Item>

				<Form.Item
					name="email"
					rules={[
						{
							type: 'email',
							message: 'Email-ul nu e valid',
						},
						{
							required: true,
							message: 'Adaugă un email!',
						},
					]}>
					<Input placeholder="Email" />
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						loading={isLoading}
						disabled={isLoading}
						htmlType="submit">
						Register
					</Button>
				</Form.Item>
			</Form>

			<CreateAccountWrapper>
				<AntButton onClick={() => history.push('/login')} type="link">
					Am deja cont
				</AntButton>
			</CreateAccountWrapper>
		</RegisterPageWrapper>
	);
}
