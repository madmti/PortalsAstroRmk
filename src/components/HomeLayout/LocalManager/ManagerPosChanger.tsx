import React, { useEffect, useRef } from 'react';
import { type Position, useManagerStore } from '../../../store/ManagerStore';
import './ManagerPosChanger.scss';

export default function ManagerPosChanger({
	text,
	position,
	anchor,
}: {
	text: string;
	position: Position;
	anchor: null | string;
}) {
	const managerStore = useManagerStore((store) => store);
	const elementRef = useRef(null);
	const handleClick = () => {
		managerStore.setPosition(position);
	};

	useEffect(() => {
		managerStore.pos === position
			? //@ts-ignore
			  (elementRef.current.className = 'on')
			: //@ts-ignore
			  (elementRef.current.className = '');
	}, [managerStore.pos]);

	return (
		<>
			{anchor === null ? (
				<button id="ManagerPosChanger" ref={elementRef} onClick={handleClick}>
					{text}
				</button>
			) : (
				<a
					id="ManagerPosChanger"
					ref={elementRef}
					onClick={handleClick}
					href={anchor}
				>
					{text}
				</a>
			)}
		</>
	);
}
