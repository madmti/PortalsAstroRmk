import type { Message, UserData } from '@/lib/Types';
import type { Socket } from 'socket.io-client';
import { create } from 'zustand';

export type TextChannelStore = {
	socket: Socket<any> | null;
	setSocket: (io: Socket<any> | null) => void;
	history: Message[] | null;
	setHistory: (hist: Message[]) => void;
	pushHistory: (msg: Message) => void;
	delHistory: () => void;
	users: UserData[] | null;
	setUsers: (userArr: UserData[]) => void;
	pushUser: (user: UserData) => void;
	delUsers: () => void;
	delOneUser: (user: UserData) => void;
};

export const useTextChannelStore = create<TextChannelStore>((set) => ({
	socket: null,
	setSocket: (io: Socket<any> | null) => {
		set((prev) => {
			if (prev.socket !== null) {
				prev.socket.disconnect();
			}
			return { socket: io };
		});
	},
	history: null,
	setHistory: (hist: Message[]) => {
		set((prev) => ({ history: hist }));
	},
	pushHistory: (msg: Message) => {
		set((prev) => {
			if (prev.history === null) return { history: [msg] };
			else return { history: [...prev.history, msg] };
		});
	},
	delHistory: () => {
		set((prev) => ({ history: null }));
	},
	users: null,
	setUsers: (userArr: UserData[]) => {
		set((prev) => ({ users: userArr }));
	},
	pushUser: (user: UserData) => {
		set((prev) => {
			if (prev.users === null) return { users: [user] };
			else return { users: [...prev.users, user] };
		});
	},
	delUsers: () => {
		set((prev) => ({ users: null }));
	},
	delOneUser: (user: UserData) => {
		set((prev) => {
			if (prev.users === null || prev.users.length === 0) return {};
			const ref = prev.users;
			ref.splice(prev.users.indexOf(user), 1);
			return { users: ref };
		});
	},
}));
