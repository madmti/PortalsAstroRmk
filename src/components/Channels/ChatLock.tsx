import { useTextChannelStore } from '../../store/ChannelStore';
import React, { useEffect, useState } from 'react';

export default function ChatLock() {
	const history = useTextChannelStore((store) => store.history);
	const [lock, setLock] = useState(true);
	useEffect(() => {
		if (!lock) return;
		const scroll = document.querySelector('ul#box');
		scroll ? (scroll.scrollTop = scroll?.scrollHeight) : 0;
	}, [history, lock]);

	return (
		<button
			type="button"
			onClick={() => {
				setLock(!lock);
			}}
		>
			{lock ? (
				<img src="/lock.svg" width={20} height={20} alt="" />
			) : (
				<img src="/unlock.svg" width={20} height={20} alt="" />
			)}
		</button>
	);
}
