import './UserSection.scss';
import type { JwtPayload } from 'jsonwebtoken';
import FriendsList from './FriendsList';
import UserInfo from './UserInfo';
import UserRequests from './UserRequests';
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
				<UserInfo payload={payload} URL={URL} />
				<UserRequests />
				<FriendsList payload={payload} />
			</div>
		</section>
	);
}
