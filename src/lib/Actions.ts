import { decode, type JwtPayload } from 'jsonwebtoken';
import type { UserData } from './Types';
declare module 'jsonwebtoken' {
	interface JwtPayload {
		user: UserData;
		auth: {
			date: Date;
		};
	}
}

export const validateStoken = (
	token: string | undefined
): JwtPayload | false => {
	if (!token || token === 'deleted') return false;

	const payload = decode(token, { json: true });

	if (payload === null || !payload || !payload.user || !payload.auth)
		return false;

	return payload;
};

export const EasyTryCatch = async (callback: Function) => {
	let res = null;
	try {
		res = await callback();
	} catch (error) {
		console.log(error);
	}
	return res;
};

export const renewTokenRequest = async (URL: string, payload: string) => {
	type resData = {
		status: boolean;
		msg: string;
		cookie: string;
	};

	const data: resData = await EasyTryCatch(async () => {
		const res = await fetch(`${URL}/auth/renew`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: payload,
		});
		return await res.json();
	});
	return data;
};
