import { useEffect } from 'react';

type formData = {
	id: string;
	serverID: HTMLInputElement;
};
type resData = {
	status: boolean;
	msg: string;
	redirect: string;
};

export default function JoinSubmitter({
	URL,
	userID,
}: {
	URL: string;
	userID: string;
}) {
	const handleSubmit = async (ev: SubmitEvent) => {
		ev.preventDefault();
		//@ts-ignore
		const form: formData = ev.target;
		const data = {
			user: userID,
			server: form.serverID.value,
		};
		fetch(`${URL}/data/servers/join`, {
			headers: {
				'Content-type': 'application/json',
			},
			method: 'post',
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data: resData) => {
				if (!data.status) {
					alert(data.msg);
					return;
				}
				location.pathname = data.redirect;
			});
	};
	useEffect(() => {
		onsubmit = handleSubmit;
	}, []);
	return null;
}
