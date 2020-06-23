import React from 'react';
import {
	SettingOutlined,
	ProfileOutlined,
	ProfileFilled,
	HomeFilled,
	HomeOutlined,
	SettingFilled,
} from '@ant-design/icons';
import { FooterWrapper, FooterLinkButton } from './footer.styled';

import { useLocation } from 'react-router-dom';
import dashiconpng from '../../assets/gif/dash-icon.png';
import generaliconpng from '../../assets/gif/general-icon.png';
import setticonpng from '../../assets/gif/sett-icon.png';

export default function Footer() {
	const location = useLocation();
	return (
		<FooterWrapper>
			<FooterLinkButton
				className={`${location.pathname === '/dashboard' ? 'active' : 'inactive'}`}
				to="/dashboard">

				<img src={dashiconpng} />
			</FooterLinkButton>

			<FooterLinkButton
				className={`${location.pathname === '/general-actions' ? 'active' : 'inactive'}`}
				to="/general-actions">
				<img src={generaliconpng} />
			</FooterLinkButton>

			<FooterLinkButton
				className={`${location.pathname === '/settings' ? 'active' : 'inactive'}`}
				to="/settings">
				<img src={setticonpng} />
			</FooterLinkButton>
		</FooterWrapper>
	);
}
