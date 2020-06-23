import React, { useContext, useState, useEffect } from "react";
import {
	HomeOutlined,
	FileProtectOutlined,
	SecurityScanOutlined,
	BookOutlined,
	IdcardOutlined,
} from '@ant-design/icons';
import { AppContext } from "../../context/app.context";

import cariconpng from '../../assets/gif/car-icon.png';
import asigurarileicon from '../../assets/gif/asigurarilemele-icon.png';
import documenteleicon from '../../assets/gif/documentelemele-icon.png';

import notificationicon from '../../assets/gif/notifications.png';
import serviceicon from '../../assets/gif/service-icon.png';
import { useHistory } from 'react-router-dom';
import { FancyHeader, ListItem } from '../../components';
import { ButtonsWrapper, DashboardPageWrapper, IconNumberWrapper, TitleWrapper, ImgWrapper,TitleNameWrapper, ContainerWrapper, IconNotificationNumberWrapper} from './dashboard.styled';

export default function DashboardPage() {
	const { user, getTasks, tasks, notifications } = useContext(AppContext);
	const [tasksLocal, setTasksLocal] = useState([]);
	const [tasksNumber, setTasksNumber] = useState(0);
	const [notificatioNumber, setNotificationNumber] = useState(0);
	const [selectedOption, setSelectedOption] = useState(0);

	// Order by date and reverse array



	useEffect(() => {
		getTasks(user.jwt);

	  }, []);

	  useEffect(() => {
		if (tasks) {
			setTasksNumber([...tasks.STATE_NEW, ...tasks.STATE_IN_PROGRESS, ...tasks.STATE_REJECTED, ...tasks.STATE_APPROVED].length);
		}
	  }, [tasks]);

	  useEffect(() => {
		if (notifications) {
			setNotificationNumber(notifications.length);
		}
	  }, [notifications]);




	

	const history = useHistory();

	return (
		<DashboardPageWrapper className="DashboardPageWrapper">
			<TitleWrapper>
				<TitleNameWrapper>
					Dashboard
				</TitleNameWrapper>
				<ContainerWrapper>
					<ImgWrapper src={notificationicon} />
					<IconNotificationNumberWrapper> {notificatioNumber} </IconNotificationNumberWrapper>
				</ContainerWrapper >
			</TitleWrapper>
			<ButtonsWrapper>
				<ListItem
					className={selectedOption === "Solicitarile mele" ? "active" : ""}
					onClick={() => {
						if (selectedOption === "Solicitarile mele") {
							setSelectedOption(null);
						} else {
							setSelectedOption('Solicitarile mele');
						}
					}}
					title="Solicitarile mele"
					subtitle="Vezi toate solicitarile"
					icon={<IconNumberWrapper> {tasksNumber} </IconNumberWrapper>}
					action={() => history.push('/tasks')}
				/>
				<ListItem
					title="Garajul meu"
					subtitle="Vezi toate masinile"
					icon={<img src={cariconpng} />}
					action={() => history.push('/garage')}
				/>
				<ListItem
					title="Asigurarile mele"
					disabled
					subtitle="Vezi toate asigurarile"
					icon={<img src={asigurarileicon} />}
					action={() => history.push('/insurance')}
				/>
				<ListItem
					disabled
					title="Documentele mele"
					subtitle="Vezi toate documentele"
					icon={<img src={documenteleicon} />}
					action={() => history.push('/documents')}
				/>
				{/* <ListItem
					disabled
					title="eCarte service"
					subtitle="eCard-ul tau"
					icon={<img src={serviceicon} />}
					action={() => history.push('/eCard')}
				/> */}
				<ListItem
					title="Developer room"
					subtitle="Doar pentru developeri"
					icon={<IdcardOutlined />}
					action={() => history.push('/developer-room')}
				/>
			</ButtonsWrapper>
		</DashboardPageWrapper>
	);
}
