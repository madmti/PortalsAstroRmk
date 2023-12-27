import { useManagerStore } from '@/store/ManagerStore';
import UserSection from '@/components/LocalNav/UserSection';
import MusicSection from '@/components/LocalNav/MusicSection';
import EventSection from '@/components/LocalNav/EventSection';

export default function ReactMainManager({
	children,
	BACKEND_URL,
}: {
	children: any;
	BACKEND_URL: string;
}) {
	const position = useManagerStore((store) => store.pos);
	const Contents = {
		servers: children,
		music: <MusicSection />,
		events: <EventSection />,
		user: <UserSection />,
	};
	return <>{Contents[position] ? Contents[position] : 'Error'}</>;
}
