import { create } from 'zustand';

export type Position = 'servers' | 'music' | 'events' | 'user';

type ManagerStore = {
	pos: Position;
	setPosition: (newPos: Position) => void;
};

export const useManagerStore = create<ManagerStore>((set) => ({
	pos: 'servers',
	setPosition: (newPos: Position) => {
		set((prev) => ({ pos: newPos }));
	},
}));
