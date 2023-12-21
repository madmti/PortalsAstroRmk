import { useEffect } from 'react';
import { useState } from 'react';

type FormData = {
	email: HTMLInputElement;
};

type resData = {
	status: boolean;
	msg: string;
	redirect: string;
};

export default function ForgotSubmitter({ URL }: { URL: string }) {
	const [msg, setMsg] = useState('');

	const onSubmit = (ev: SubmitEvent) => {
		ev.preventDefault();
		//@ts-ignore
		const form: FormData = ev.target;
		const data = {
			email: form.email.value,
		};
		fetch(`${URL}/auth/forgot`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'post',
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data: resData) => {
				if (!data.status) {
					setMsg(data.msg);
					return;
				}
				alert(data.msg);
				location.pathname = data.redirect;
			})
			.catch((err) => {
				console.log(err);
				setMsg('failed getting backend services.');
			});
	};

	useEffect(() => {
		onsubmit = onSubmit;
	}, []);
	return <p>{msg}</p>;
}
