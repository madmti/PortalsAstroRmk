import { useEffect } from 'react';

type FormData = {
	svName: HTMLInputElement;
	isPublic: HTMLInputElement;
	desc: HTMLInputElement;
};

type resData = {
	status: boolean;
	msg: string;
	redirect: string;
};

export default function CreateSubmitter({
	URL,
	userID,
}: {
	URL: string;
	userID: string;
}) {
	const OnSubmit = (ev: SubmitEvent) => {
		ev.preventDefault();
		//@ts-ignore
		const form: FormData = ev.target;
		const data = {
			user: userID,
			name: form.svName.value,
			isPublic: form.isPublic.checked,
			desc: form.desc.value,
		};
		fetch(`${URL}/data/servers/create`, {
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
