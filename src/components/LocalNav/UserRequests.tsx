import type { Request, UserData } from '@/lib/Types';
import type { JwtPayload } from 'jsonwebtoken';
import { useEffect, useState } from 'react';

const RequestCardFriend = ({
	req,
	URL,
	payload,
}: {
	req: Request;
	URL: string;
	payload: JwtPayload;
}) => {
	const [sure, setSure] = useState(false);
	//@ts-ignore
	const from: UserData = req.from;
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		fetch(`${URL}/user/request/call`, {
			method: 'post',
			headers: {
				'Content-type': 'application/json',
				authorization: JSON.stringify(payload),
			},
			body: JSON.stringify({
				reqID: req._id.toString(),
				call: !sure,
			}),
		})
			.then((res) => res.json())
			.then((data: { status: boolean; msg: string; del: boolean }) => {
				console.log(data.msg);
				if (!data.status || !data.del) return;
				location.pathname = '/renew';
			});
	};
	return (
		<form id="request" onSubmit={handleSubmit}>
			<div>
				<img
					src={from.imgUrl ? `${URL}/${from.imgUrl}` : '/portal.svg'}
					width={25}
					height={25}
					alt=""
				/>
				<p>
					<strong style={{ color: 'var(--essential-positive)' }}>
						{from.name}
					</strong>{' '}
					wants to be your friend!
				</p>
			</div>
			{sure ? (
				<div>
					<button id="red" type="submit">
						<img src="/delete.svg" width={20} height={20} alt="" />
					</button>
					<button
						id="blue"
						type="button"
						onClick={() => {
							setSure(!sure);
						}}
					>
						<img src="/return.svg" width={20} height={20} alt="" />
					</button>
				</div>
			) : (
				<div>
					<button type="submit">
						<img src="/check.svg" width={20} height={20} alt="" />
					</button>
					<button
						id="red"
						type="button"
						onClick={() => {
							setSure(!sure);
						}}
					>
						<img src="/cancel.svg" width={20} height={20} alt="" />
					</button>
				</div>
			)}
		</form>
	);
};

export default function UserRequests({
	URL,
	payload,
}: {
	URL: string;
	payload: JwtPayload;
}) {
	const [reqs, setReqs] = useState<Request[] | null>(null);
	useEffect(() => {
		fetch(`${URL}/user/request`, {
			method: 'get',
			headers: {
				authorization: JSON.stringify(payload),
			},
		})
			.then((res) => res.json())
			.then((data: { status: boolean; msg: string; reqs: Request[] }) => {
				if (!data.status) {
					console.log(data.msg);
					return;
				}
				setReqs(data.reqs);
			});
	}, []);
	return (
		<article>
			<h3>Requests</h3>
			<ul>
				{reqs === null
					? 'no requests yet..'
					: reqs.map((req, idx) => (
							<RequestCardFriend
								URL={URL}
								payload={payload}
								req={req}
								key={idx}
							/>
					  ))}
			</ul>
		</article>
	);
}
