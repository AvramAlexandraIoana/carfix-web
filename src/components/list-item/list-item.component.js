import React from 'react';
import {
	ListItemWrapper,
	IconWrapper,
	TitleWrapper,
	InfoWrapper,
	SubtitleWrapper,
} from './list-item.style';

import {
ArrowRightOutlined
} from '@ant-design/icons';

export default function ListItem({ title, icon, action, subtitle, disabled }) {
	return (
		<ListItemWrapper
			className={`ListItemWrapper ${disabled ? 'disabled' : 'active'} ${title.replace(" ", "-")}`}
			onClick={disabled ? null : action}>
			<InfoWrapper className="InfoWrapper">
				<TitleWrapper className="TitleWrapper">{title}</TitleWrapper>
				{subtitle && (
					<SubtitleWrapper className="SubtitleWrapper">{subtitle} <ArrowRightOutlined /></SubtitleWrapper>
				)}
			</InfoWrapper>
			<IconWrapper className="IconWrapper">{icon}</IconWrapper>
		</ListItemWrapper>
	);
}
