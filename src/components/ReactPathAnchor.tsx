import './ReactPathAnchor.scss';
interface Props {
	href?: string;
	text: string;
	style?: React.CSSProperties;
	children: any;
}

export default function ReactPathAnchor({ text, href, style, children }: Props) {
	return href ? (
		<a id="reactpathanchor" href={href} style={style}>
			{children}
			{text}
		</a>
	) : (
		<p id="reactpathanchor" style={style}>
			{children}
			{text}
		</p>
	);
}
