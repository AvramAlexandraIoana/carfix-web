import React, { useContext } from 'react';
import { AppContext } from '../../context/app.context';
import { useHistory, Redirect } from 'react-router-dom';
import { Form, Input, Button as AntButton } from 'antd';

import {
	ForgotPasswordPageWrapper,
	LogoWrapper,
	Button,
	CreateAccountWrapper,
} from './forgot-password.style';
import { FancyHeader, Logo } from '../../components';

export default function ForgotPasswordPage() {
	const { user, forgotPassword, isLoading } = useContext(AppContext);
	const history = useHistory();

	const onFinish = formData => {
		forgotPassword(formData);
	};

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo);
	};

	if (user) {
		return <Redirect to="/dashboard" />;
	}
	return (
		<ForgotPasswordPageWrapper>
			<LogoWrapper>
				<Logo />
			</LogoWrapper>

			<FancyHeader
				title="Ai uitat parola?"
				subtitle="Nici o problema! O recuperezi usor in doar doi pasi!"
			/>
			<Form
				name="basic"
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}>
				<Form.Item
					name="email_or_phone"
					rules={[{ required: true, message: 'Adauga email sau telefon!' }]}>
					<Input placeholder="Email / Telefon" />
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						loading={isLoading}
						disabled={isLoading}
						htmlType="submit">
						Am uitat parola
					</Button>
				</Form.Item>
			</Form>

			<CreateAccountWrapper>
				<AntButton onClick={() => history.push('/login')} type="link">
					Am deja cont
				</AntButton>
			</CreateAccountWrapper>
		</ForgotPasswordPageWrapper>
	);
}
