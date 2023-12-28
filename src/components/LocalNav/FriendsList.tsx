import { useState } from 'react';
import type { JwtPayload } from 'jsonwebtoken';
import ReactPathAnchor from '../ReactPathAnchor';

export default function FriendsList({ payload }: { payload: JwtPayload }) {
	const [edit, setEdit] = useState(false);

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
			</h3>
			<ul>
				<li>
					<ReactPathAnchor text="Frien 1">
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
			</ul>
		</article>
	);
}
