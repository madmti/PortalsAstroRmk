import './ChatReact.scss';
import { useTextChannelStore } from '@/store/ChannelStore';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { TextChannelSetEventHandlers } from '@/lib/socket/Actions';
import ChatLock from '@/components/Channels/ChatLock';

export default function ChatReact({
	chanID,
	serverID,
	userID,
	URL,
	WSDIR,
}: {
	chanID: string;
	serverID: string;
	userID: string;
	URL: string;
	WSDIR: string;
}) {
	const TextChannelStore = useTextChannelStore((store) => store);

	const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		//@ts-ignore
		const msg: string = ev.target.message.value;
		//@ts-ignore
		ev.target.message.value = '';
		if (msg.length === 0 || TextChannelStore.socket === null) return;
		TextChannelStore.socket.emit('msg', msg, Date.now());
	};
	useEffect(() => {
		if (TextChannelStore.socket === null) {
			const socketio = io(WSDIR + '/textchat', {
				auth: {
					user: userID,
					chan: chanID,
					serv: serverID,
				},
			});
			//@ts-ignore
			TextChannelSetEventHandlers(socketio, TextChannelStore);
			TextChannelStore.setSocket(socketio);
		}

		return () => {
			if (TextChannelStore.socket !== null) {
				TextChannelStore.socket.disconnect();
				TextChannelStore.setSocket(null);
			}
		};
	}, []);
	return (
		<section id="chat">
			<ul id="box">
				<div id="scroll">
					{TextChannelStore.history === null
						? ''
						: TextChannelStore.history.map((msg, idx, arr) => {
								const notChain =
									idx === 0 ||
									arr[idx - 1].author._id.toString() !==
										msg.author._id.toString();
								const styles = notChain
									? { marginBottom: '0.5rem' }
									: { margin: '0.5rem 0' };
								return (
									<li key={idx} style={styles}>
										<span
											id={msg.author._id.toString() === userID ? 'me' : 'ot'}
										>
											{notChain && (
												<small
													title={`${msg.author.name} ${
														msg.author.alias ? `( ${msg.author.alias} )` : ''
													}`}
												>
													{msg.author.alias
														? msg.author.alias
														: msg.author.name}
												</small>
											)}{' '}
											<p>{msg.content}</p>
										</span>
									</li>
								);
						  })}
				</div>
			</ul>
			<form
				autoComplete="off"
				onSubmit={(ev) => {
					handleSubmit(ev);
				}}
			>
				<ChatLock />
				<input
					placeholder="Send a message.."
					autoFocus
					required
					name="message"
					type="text"
				/>
				<button>
					<img src="/send.svg" width={25} height={25} alt="" />
				</button>
			</form>
		</section>
	);
}
