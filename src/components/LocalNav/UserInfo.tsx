import type { JwtPayload } from 'jsonwebtoken';
import ReactPopUp from '../ReactPopUp';
import { useState } from 'react';

type response = {
	status: boolean;
	msg: string;
	redirect: string;
};

const UserNameEditForm = ({
	payload,
	URL,
}: {
	payload: JwtPayload;
	URL: string;
}) => {
	const [msg, setMsg] = useState('');
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		//@ts-ignore
		const username = e.target.username.value;
		fetch(`${URL}/user/edit`, {
			method: 'post',
			headers: {
				'Content-type': 'application/json',
				authorization: JSON.stringify(payload),
			},
			body: JSON.stringify({ username: username }),
		})
			.then((res) => res.json())
			.then((data: response) => {
				console.log(data);
				if (!data.status) {
					setMsg(data.msg);
					return;
				}
				location.pathname = data.redirect;
			});
	};

	return (
		<form onSubmit={handleSubmit} id="pop">
			<h3>new user name</h3>
			<p>if you dont want to change it write your actual username</p>
			<input
				autoComplete="off"
				type="text"
				name="username"
				defaultValue={payload.user.name.toString()}
			/>
			<p style={{ color: 'var(--essential-negative)' }}>{msg}</p>
			<button type="submit">Change</button>
		</form>
	);
};
const UserImgEditForm = ({
	payload,
	URL,
}: {
	payload: JwtPayload;
	URL: string;
}) => {
	const [msg, setMsg] = useState('');
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		//@ts-ignore
		const file = e.target.img.files[0];
		//@ts-ignore
		const extension = e.target.img.files[0].type.split('/').pop();
		fetch(`${URL}/user/img`, {
			method: 'post',
			headers: {
				'Content-type': 'application/octet-stream',
				authorization: JSON.stringify(payload),
				filetype: extension,
			},
			body: file,
		})
			.then((res) => res.json())
			.then((data: response) => {
				if (!data.status) {
					setMsg(data.msg);
					return;
				}
				location.pathname = data.redirect;
			});
	};
	return (
		<form id="pop" onSubmit={handleSubmit}>
			<h3>new profile img</h3>
			<p>if you dont want to change it leave it without a file</p>
			<input
				required
				name="img"
				size={10485760}
				accept=".png, .jpg, .jpeg"
				type="file"
			/>{' '}
			<p style={{ color: 'var(--essential-negative)' }}>{msg}</p>
			<button type="submit">Change</button>
		</form>
	);
};

export default function UserInfo({
	payload,
	URL,
}: {
	payload: JwtPayload;
	URL: string;
}) {
	return (
		<header>
			<img
				src={
					payload.user.imgUrl === null
						? '/portal.svg'
						: `${URL}/${payload.user.imgUrl}`
				}
				width={80}
				height={80}
				alt=""
			/>
			<ReactPopUp options={{ id: 'blue', img: { src: '/edit.svg', size: 25 } }}>
				<UserImgEditForm URL={URL} payload={payload} />
			</ReactPopUp>
			<br />
			<br />
			<br />
			<br />
			<h3>{payload.user.name}</h3>
			<ReactPopUp options={{ id: 'blue', img: { src: '/edit.svg', size: 25 } }}>
				<UserNameEditForm URL={URL} payload={payload} />
			</ReactPopUp>
		</header>
	);
}
