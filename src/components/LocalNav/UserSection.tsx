import './UserSection.scss';
import type { JwtPayload } from 'jsonwebtoken';
import FriendsList from './FriendsList';
import UserInfo from './UserInfo';

export default function UserSection({
	payload,
	URL,
}: {
	payload: JwtPayload;
	URL: string;
}) {
	return (
		<section id="usersection">
			<div className="scroll">
				<UserInfo payload={payload} URL={URL}/>
				<FriendsList payload={payload}/>
			</div>
		</section>
	);
}
