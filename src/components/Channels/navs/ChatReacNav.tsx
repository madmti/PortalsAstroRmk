import './ChatReactNav.scss';
import { useTextChannelStore } from '@/store/ChannelStore';
import ReactPathAnchor from '@/components/ReactPathAnchor';

export default function ChatReactNav({ userID }: { userID: string }) {
	const TextChannelStore = useTextChannelStore((store) => store);

	return (
		<div id="chatnav">
			<h3>Users</h3>
			<ul>
				{TextChannelStore.users?.map((user) => {
					const isMe = user._id.toString() === userID;
					return (
						<ReactPathAnchor
							style={isMe ? { color: 'var(--text-positive)' } : {}}
							text={user.alias ? user.alias.toString() : user.name.toString()}
						>
							<img src="/user.svg" width={20} height={20} alt="" />
						</ReactPathAnchor>
					);
				})}
			</ul>
		</div>
	);
}
