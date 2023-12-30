import './ReactPopUp.scss';
import { useState } from 'react';

type IMG = {
	src: string;
	size: number;
};

type Opt = {
	id?: string;
	text?: string;
	img?: IMG;
};

export default function ReactPopUp({
	children,
	options,
}: {
	children: any;
	options?: Opt;
}) {
	const [active, setActive] = useState(false);
	const handleClick = () => setActive(!active);

	const btn = options ? (
		<button onClick={handleClick} id={options.id || ''}>
			{options.img && (
				<img
					src={options.img.src}
					width={options.img.size}
					height={options.img.size}
					alt=""
				/>
			)}
			{options.text}
		</button>
	) : (
		<button onClick={handleClick} style={{ width: 20, height: 20 }}></button>
	);

	const template = (
        <span id='backdropPopUp'>
            <dialog open id="popUp">
                <button onClick={handleClick} id='red' className='exitPopUp'>
                    <img src="/cancel.svg" width={20} height={20} alt="" />
                </button>
                {children}
            </dialog>
        </span>
	);

	return active ? template : btn;
}
