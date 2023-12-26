import { useEffect, useState } from 'react';

type formData = {
	user: HTMLInputElement;
	pasw: HTMLInputElement;
};

type SvResponse = {
	status: boolean;
	msg: string;
	cookie: string;
	redirect: string;
};

export default function LoginSubmitter({ URL }: { URL: string }) {
	const [msg, setMsg] = useState('');
	const onSubmit = async (ev: SubmitEvent) => {
		ev.preventDefault();
		//@ts-ignore
		const form: formData = ev.target;
		const data = {
			user: form.user.value,
			pasw: form.pasw.value,
		};
		fetch(`${URL}/auth/login`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'post',
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data: SvResponse) => {
				if (!data.status) {
					setMsg(data.msg);
					return;
				}
				document.cookie = data.cookie;
				location.pathname = data.redirect;
			})
			.catch((reason) => {
				console.log(reason);
				setMsg('failed getting backend services');
			});
	};

	useEffect(() => {
		onsubmit = onSubmit;
	}, []);

	return <p>{msg}</p>;
}
