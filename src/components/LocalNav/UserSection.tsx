import './UserSection.scss';
import type { JwtPayload } from 'jsonwebtoken';
import ReactPopUp from '@/components/ReactPopUp';
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
					<ReactPopUp />
				</header>
				<article></article>
			</div>
		</section>
	);
}
