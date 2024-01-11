import type { UserData } from '@/lib/Types';
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Peer from 'peerjs';
import { v4 } from 'uuid';

interface Props {
	WEBSOCKET_URL: string;
	userID: string;
	roomID: string;
}

const CreateVideoStream = (stream: MediaStream, id: string) => {
	const Component = () => {
		const ref = useRef<HTMLVideoElement | null>(null);
		useEffect(() => {
			if (ref.current === null) return;
			ref.current.srcObject = stream;
		}, []);
		return <video ref={ref} autoPlay></video>;
	};
	return { ele: Component, id: id };
};

export default function ClientComponent({
	WEBSOCKET_URL,
	userID,
	roomID,
}: Props) {
	const [videos, setVideos] = useState<Array<any>>([]);
	const appendUserVideo = (stream: MediaStream, id: string) => {
		setVideos([...videos, CreateVideoStream(stream, id)]);
	};
	const deleteUserVideo = (id: string) => {
		setVideos(videos.filter((vid) => vid.id !== id));
	};

	useEffect(() => {
		const socket = io(WEBSOCKET_URL + '/webrtc', {
			auth: {
				user: userID,
				room: roomID,
			},
		});
		const peer = new Peer(userID);
		socket.on('user-leave', (user: UserData) => {
			console.log('user has leaved', user.name);
		});

		navigator.mediaDevices
			.getUserMedia({ video: true })
			.then((stream: MediaStream) => {
				appendUserVideo(stream, userID);

				socket.on('user-join', (user: UserData) => {
					console.log('user has joined', user.name);
					const call = peer.call(user._id.toString(), stream);
                    if (!call){
                        console.log('call error');
                    }
					call.on('stream', (userStream: MediaStream) => {
						appendUserVideo(userStream, user._id.toString());
					});
					call.on('close', () => {
						deleteUserVideo(user._id.toString());
					});
				});
				peer.on('call', (call) => {
					call.answer(stream);
					const callId = v4();
					call.on('stream', (userStream) => {
						appendUserVideo(userStream, callId);
					});
					call.on('close', () => {
						deleteUserVideo(callId);
					});
				});
			});
	}, []);

	return (
		<>
			{videos.map((Vid, idx) => (
				<Vid.ele key={idx} />
			))}
		</>
	);
}
