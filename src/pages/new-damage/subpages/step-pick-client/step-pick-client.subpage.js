import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../../../../context/app.context';
import { API_URL } from '../../../../constants';
import { message, Spin, Select, Button } from 'antd';
import { FancyHeader } from '../../../../components';
import { isEmpty } from '../../../../utils';

import {
	StepPickClientWrapper,
	SpinWrapper,
	FormWrapper,
	ButtonWrapper,
} from './step-pick-client.styled';
import { useHistory } from 'react-router-dom';

export default function StepPickClient() {
	// inspection/clients
	const { user, setIsLoading, isLoading, futureTask, setFutureTask } = useContext(AppContext);
	const [inspectorClients, setInspectorClients] = useState([]);
	const history = useHistory();

	useEffect(() => {
		setIsLoading(true);
		axios({
			method: 'get',
			url: `${API_URL}/inspection/clients`,
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${user.jwt}`,
			},
		})
			.then(function (response) {
				//handle success
				console.log(response.data.message.clients);
				setInspectorClients(response.data.message.clients);
				setIsLoading(false);
			})
			.catch(function (response) {
				//handle error
				try {
					message.error(response.response.data.message);
				} catch (e) {
					console.log('Repsonse 1252:', response);
				}
				setIsLoading(false);
			});
	}, []);

	if (isLoading) {
		return (
			<SpinWrapper>
				<Spin size="large" />
			</SpinWrapper>
		);
	}

	const handleChange = e => {
		const client = inspectorClients.find(client => client.id === e);
		setFutureTask({ ...futureTask, client });
	};

	return (
		<StepPickClientWrapper>
			<FancyHeader title="Alege un client" subtitle="Alege masina clientului" />

			<FormWrapper>
				<Select
					size="large"
					placeholder="Alege un client"
					allowClear
					showSearch
					onChange={handleChange}
					filterOption={(input, option) =>
						option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
					}>
					{inspectorClients.map(client => (
						<Select.Option key={client.id} value={client.id}>
							{client.full_name}
						</Select.Option>
					))}
				</Select>

				<ButtonWrapper className="ButtonWrapper">
					<Button
						disabled={isEmpty(futureTask.client)}
						onClick={() => history.push('/step-pick-car')}
						type="primary"
						shape="round">
						Urmatorul pas
					</Button>
				</ButtonWrapper>
			</FormWrapper>
		</StepPickClientWrapper>
	);
}
