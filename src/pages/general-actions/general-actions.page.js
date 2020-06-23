import React, { useContext } from 'react';
import { FancyHeader, ListItem } from '../../components';

import {
	FormOutlined,
	QuestionOutlined,
	SlidersOutlined,
	CarOutlined,
	SecurityScanOutlined,
	ToolOutlined,
	BuildOutlined,
} from '@ant-design/icons';
import daunanouaiconpng from '../../assets/gif/daunanoua-icon.png';
import reviziiiconpng from '../../assets/gif/revizii-icon.png';
import pieseiconpng from '../../assets/gif/piese-icon.png';
import serviciiiconpng from '../../assets/gif/serv-icn.png';
import utileiconpng from '../../assets/gif/utile-icon.png';
import hlpiconpng from '../../assets/gif/help-icn.png';
import { AppContext } from '../../context/app.context';
import { useHistory } from 'react-router-dom';
import loadingImage from '../../assets/gif/loading.gif';
import { GeneralActionsWrapper, ButtonsWrapper } from './general-actions.style';
import { isEmpty } from '../../utils';

export default function GeneralActionsPage() {
	const { user, futureTask, setFutureTask, initialFutureTask } = useContext(AppContext);
	const history = useHistory();

	return (
		<GeneralActionsWrapper>
			<img src={loadingImage} />
			<FancyHeader
				title="Adauga o noua solicitare"
				subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod mi non erat vestibulum, eget ornare lorem semper. In hac habitasse platea dictumst. Nunc "
			/>
			<ButtonsWrapper>
				<ListItem
					title="Dauna noua"
					subtitle="Declara o dauna noua"
					icon={<img src={daunanouaiconpng} />}
					action={() => {
						if (
							futureTask.client.email &&
							window.confirm('Un task este deja in curs, vrei sa incepi task nou?')
						) {
							setFutureTask({
								...initialFutureTask,
								client: user.user,
								type: 'FNOL',
							});
						} else {
							setFutureTask({
								...futureTask,
								client: user.user,
								type: 'FNOL',
							});
						}
						history.push('/new-damage');
					}}
				/>

				{user.role === 'inspector' && (
					<ListItem
						title="Inspectie noua"
						subtitle="Pentru validare polita CASCO"
						icon={<FormOutlined />}
						action={() => {
							setFutureTask({ ...futureTask, inspector: user.user, type: 'IR' });
							history.push('/step-pick-client');
						}}
					/>
				)}

				<ListItem
					disabled
					title="Revizii"
					subtitle="Pachete manopera si servicii"
					icon={<img src={reviziiiconpng} />}
					action={() => {
						setFutureTask({ ...futureTask, client: user.user });
						history.push('/pick-car');
					}}
				/>

				<ListItem
					disabled
					title="Piese"
					subtitle="Comanda piese auto"
					icon={<img src={pieseiconpng} />}
					action={() => {
						setFutureTask({ ...futureTask, client: user.user });
						history.push('/pick-car');
					}}
				/>
				<ListItem
					disabled
					title="Service"
					subtitle="Reparatii mecanice, roti, detailing"
					icon={<img src={serviciiiconpng} />}
					action={() => {
						setFutureTask({ ...futureTask, client: user.user });
						history.push('/pick-car');
					}}
				/>
				<ListItem
					disabled
					title="Utile"
					subtitle="ITP, taxe, alte servicii"
					icon={<img src={utileiconpng} />}
					action={() => {
						setFutureTask({ ...futureTask, client: user.user });
						history.push('/pick-car');
					}}
				/>
				<ListItem
					disabled
					title="Ajutor"
					subtitle="Cum? Unde? Ce?"
					icon={<img src={hlpiconpng} />}
					action={() => {
						setFutureTask({ ...futureTask, client: user.user });
						history.push('/pick-car');
					}}
				/>
			</ButtonsWrapper>
		</GeneralActionsWrapper>
	);
}
