import { useManagerStore } from '@/store/ManagerStore';

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
		music: 'music',
		events: 'events',
		friends: 'friends',
	};
	return <>{Contents[position] ? Contents[position] : 'Error'}</>;
}
