import './ChatReact.scss';

export default function ChatReact({
	chanID,
	serverID,
	userID,
	URL,
}: {
	chanID: string;
	serverID: string;
	userID: string;
	URL: string;
}) {
	const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		//@ts-ignore
		const msg: string = ev.target.message.value;
        // ENVIAR AL SOCKET
	};
	return (
		<section id="chat">
			<ul id="box">
				<div id="scroll">
					<li>
						<span>
							<small>madmti</small>
							<p>hola ijodelaperra gran maraka</p>
						</span>
					</li>
				</div>
			</ul>
			<form
				autoComplete="off"
				onSubmit={(ev) => {
					handleSubmit(ev);
				}}
			>
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
