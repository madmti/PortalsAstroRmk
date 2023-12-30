export default function ReactSetCookie({
	cookie,
	redirect,
}: {
	cookie: string;
	redirect?: string;
}) {
	document.cookie = cookie;
	redirect ? (location.pathname = redirect) : null;
	return null;
}
