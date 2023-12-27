import React from 'react';
import './LogoutButton.scss';

export default function Logout() {
	const handleClick = () => {
		document.cookie = 'portals:stoken=deleted;path=/';
		location.pathname = '/';
	};
	return (
		<button id="logoutButton" onClick={handleClick}>
			<p>Logout</p>
		</button>
	);
}
