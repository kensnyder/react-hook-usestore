import React from 'react';

export function CoverImage({ url, width, height }) {
	return (
		<div
			className="CoverImage Component"
			style={{
				backgroundSize: 'cover',
				backgroundPosition: '50% 50%',
				backgroundImage: `url(${url})`,
				width: width + 'px',
				height: height + 'px',
			}}
		/>
	);
}
