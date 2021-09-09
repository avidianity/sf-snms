import React, { FC } from 'react';

type Props = {
	title?: string;
	subtitle?: string;
	className?: string;
};

const Card: FC<Props> = ({ title, subtitle, children, className }) => {
	return (
		<div className={`card shadow ${className || ''}`}>
			<div className='card-header'>
				<h5 className='card-title'>{title}</h5>
				<p className='card-text'>{subtitle}</p>
			</div>
			<div className='card-body'>{children}</div>
		</div>
	);
};

export default Card;
