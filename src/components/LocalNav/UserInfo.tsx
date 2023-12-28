import type { JwtPayload } from 'jsonwebtoken';
import ReactPopUp from '../ReactPopUp';
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
			<h3>{payload.user.name}</h3>
			<ReactPopUp>
				<img src="/edit.svg" width={25} height={25} alt="" />
			</ReactPopUp>
		</header>
	);
}
