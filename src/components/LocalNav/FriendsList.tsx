import { useEffect, useState } from 'react';
import type { JwtPayload } from 'jsonwebtoken';
import ReactPathAnchor from '../ReactPathAnchor';
import ReactPopUp from '../ReactPopUp';
import type { UserData } from '@/lib/Types';

type resData = {
	status: boolean;
	msg: string;
};

const AddFriendForm = ({
	URL,
	payload,
}: {
	URL: string;
	payload: JwtPayload;
}) => {
	const [msg, setMsg] = useState({ text: '', color: '' });
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		//@ts-ignore
		const username = e.target.username.value;
		fetch(`${URL}/user/request`, {
			method: 'post',
			headers: {
				'Content-type': 'application/json',
				authorization: JSON.stringify(payload),
			},
			body: JSON.stringify({ username: username }),
		})
			.then((res) => res.json())
			.then((data: resData) => {
				setMsg({
					text: data.msg,
					color: data.status
						? 'var(--essential-positive)'
						: 'var(--essential-negative)',
				});
			});
	};

	return (
		<form id="pop" onSubmit={handleSubmit}>
			<h3>Enter Username</h3>
			<input required autoComplete="off" type="text" name="username" />
			<p style={{ color: msg.color }}>{msg.text}</p>
			<button type="submit">Send</button>
		</form>
	);
};

export default function FriendsList({
	URL,
	payload,
}: {
	URL: string;
	payload: JwtPayload;
}) {
	const [edit, setEdit] = useState(false);
	const [friends, setFriends] = useState<UserData[] | null>(null);
	useEffect(() => {
		fetch(`${URL}/user/friends`, {
			method: 'get',
			headers: {
				authorization: JSON.stringify(payload),
			},
		})
			.then((res) => res.json())
			.then((data: { status: boolean; msg: string; friends: UserData[] }) => {
				if (!data.status) {
					console.log(data.msg);
					return;
				}
				setFriends(data.friends);
			});
	}, []);
	const Friends =
		friends === null || friends.length === 0 || typeof friends === 'string'
			? 'no friends yet..' //@ts-ignore
			: friends.map((friend: UserData) => {
					return (
						<li>
							<ReactPathAnchor text={friend.name.toString()}>
								<img src="/user.svg" width={20} height={20} alt="" />
							</ReactPathAnchor>
							<button id={edit ? 'red' : ''}>
								<img
									src={edit ? '/delete.svg' : '/dots.svg'}
									width={20}
									height={20}
									alt=""
								/>
							</button>
						</li>
					);
			  });

	return (
		<article>
			<h3>
				Friends
				<ReactPopUp options={{ img: { src: '/add.svg', size: 20 } }}>
					<AddFriendForm URL={URL} payload={payload} />
				</ReactPopUp>
				{Friends !== 'no friends yet..' ? (
					<button
						id={edit ? '' : 'blue'}
						onClick={() => {
							setEdit(!edit);
						}}
					>
						<img
							src={edit ? '/check.svg' : '/edit.svg'}
							width={20}
							height={20}
							alt=""
						/>
					</button>
				) : (
					''
				)}
			</h3>
			<ul>{Friends}</ul>
		</article>
	);
}
