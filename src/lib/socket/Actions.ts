import type { Socket } from 'socket.io-client';
import type { Message, UserData } from '@/lib/Types';
import type { TextChannelStore } from '@/store/ChannelStore';

export const TextChannelSetEventHandlers = (
	socket: Socket<any>,
	store: TextChannelStore
) => {
	socket.on('history', (history: Message[] | null) => {
		if (history === null) return;
		store.setHistory(history);
	});
    socket.on('users on', (users:UserData[]) => {
        store.setUsers(users);
    });
	socket.on('msg', (msg: Message) => {
		store.pushHistory(msg);
	});
	socket.on('joined', (user: UserData) => {
        store.pushUser(user);
    });
	socket.on('leave', (user: UserData) => {
        store.delOneUser(user);
    });
};
