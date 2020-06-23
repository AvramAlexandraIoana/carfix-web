import React, { useContext } from 'react';
import { AppContext } from '../../context/app.context';
import { useHistory, Redirect } from 'react-router-dom';
import { Form, Input, Button as AntButton } from 'antd';

import {
	LoginPageWrapper,
	LogoWrapper,
	Button,
	CreateAccountWrapper,
	ForgotPassWrapper,
} from './login.style';
import { FancyHeader, Logo } from '../../components';

export default function LoginPage() {
	const { user, authenticate, isLoading, loginRole } = useContext(AppContext);
	const history = useHistory();

	const onFinish = formData => {
		authenticate(formData);
	};

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo);
	};

	// ONLY DEV START
	// if (localStorage['user']) {
	// 	setUser(JSON.parse(localStorage['user']));
	// 	return <Redirect to="/damage-policy" />;
	// }
	/// ONLY DEV STOP

	if (user) {
		return <Redirect to="/dashboard" />;
	}
	return (
		<LoginPageWrapper>
			<LogoWrapper>
				<Logo />
			</LogoWrapper>
			<FancyHeader title="Logheaza-te!" subtitle={`Esti un ${loginRole}`} />
			<Form id="form-login"
				name="basic"
				initialValues={{
					remember: true,
					username: 'client@ejump.ro',
					password: '!Q2w3e4r5t6y',
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}>
				<Form.Item
					name="username"
					rules={[
						{ required: true, message: 'Adauga un email!' },
						{ type: 'email', message: 'Adauga un email valid!' },
					]}>
					<Input placeholder="Email" />
				</Form.Item>

				<Form.Item
					name="password"
					rules={[{ required: true, message: 'Adauga o parola!' }]}>
					<Input.Password placeholder="Password" />
				</Form.Item>


				<Form.Item>
					<Button
						type="primary"
						loading={isLoading}
						disabled={isLoading}
						htmlType="submit">
						Intra
					</Button>
				</Form.Item>
					<ForgotPassWrapper>
						<AntButton onClick={() => history.push('/forgot-password')} type="link">
								Am uitat parola
							</AntButton>
					</ForgotPassWrapper>
			</Form>

			<CreateAccountWrapper>
				<AntButton onClick={() => history.push('/register')} type="link">
					Nu am cont
				</AntButton>
			</CreateAccountWrapper>
		</LoginPageWrapper>
	);
}
