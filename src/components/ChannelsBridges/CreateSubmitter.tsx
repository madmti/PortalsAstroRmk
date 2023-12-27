import { useEffect } from 'react';

type FormData = {
	chan: HTMLInputElement;
	is: HTMLInputElement;
};

type resData = {
	status: boolean;
	msg: string;
	redirect: string;
};

export default function CreateSubmitter({
	URL,
	userID,
	svID,
}: {
	URL: string;
	userID: string;
	svID: string;
}) {
	const OnSubmit = (ev: SubmitEvent) => {
		ev.preventDefault();
		//@ts-ignore
		const form: FormData = ev.target;
		const data = {
			user: userID,
            server: svID,
            name: form.chan.value,
            is: form.is.value
		};
		fetch(`${URL}/data/channels/add`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
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
		onsubmit = OnSubmit;
	}, []);
	return null;
}
