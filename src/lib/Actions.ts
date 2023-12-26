import { decode, type JwtPayload } from 'jsonwebtoken';
declare module 'jsonwebtoken' {
	interface JwtPayload {
		user: {
			id: string;
			name: string;
		};
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
