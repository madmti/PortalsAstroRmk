import { useManagerStore } from '@/store/ManagerStore';
import UserSection from '@/components/LocalNav/UserSection';
import MusicSection from '@/components/LocalNav/MusicSection';
import EventSection from '@/components/LocalNav/EventSection';
import type { JwtPayload } from 'jsonwebtoken';

export default function ReactMainManager({
	children,
	BACKEND_URL,
	payload,
}: {
	children: any;
	BACKEND_URL: string;
	payload: JwtPayload;
}) {
	const position = useManagerStore((store) => store.pos);
	const Contents = {
		servers: children,
		music: <MusicSection />,
		events: <EventSection />,
		user: <UserSection URL={BACKEND_URL} payload={payload}/>,
	};
	return <>{Contents[position] ? Contents[position] : 'Error'}</>;
}
