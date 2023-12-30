import { useState } from 'react';
import type { JwtPayload } from 'jsonwebtoken';
import ReactPathAnchor from '../ReactPathAnchor';
import type { UserData } from '@/lib/Types';

export default function FriendsList({ payload }: { payload: JwtPayload }) {
	const [edit, setEdit] = useState(false);

	const Friends =
		payload.user.friends === null ||
		payload.user.friends.length === 0 ||
		typeof payload.user.friends === 'string'
			? 'no friends yet..' //@ts-ignore
			: payload.user.friends.map((friend: UserData) => {
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
				<button id={edit ? 'red' : ''}>
					<img
						src={edit ? '/cancel.svg' : '/add.svg'}
						width={20}
						height={20}
						alt=""
					/>
				</button>
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
