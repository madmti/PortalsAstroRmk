import { EasyTryCatch } from './Actions';
import { type Channel, type Server } from './Types';

type GetUserServersResponse = {
	status: boolean;
	msg: string;
	servers: Server[] | null;
};

export const GetUserServers = async (URL: string, Payload: string) => {
	const data: GetUserServersResponse = await EasyTryCatch(async () => {
		const res = await fetch(`${URL}/data/servers`, {
			method: 'get',
			headers: {
				authorization: Payload,
			},
		});
		return await res.json();
	});
	if (!data.status) {
		console.log(data.msg);
	}

	return data.servers || [];
};

type GetServerChannelsResponse = {
	status: boolean;
	channels: Channel[];
	server: Server;
	msg: string;
};

export const GetServerChannels = async (
	URL: string,
	Payload: string,
	ServerId: string
) => {
	const data: GetServerChannelsResponse = await EasyTryCatch(async () => {
		const res = await fetch(`${URL}/data/channels/${ServerId}`, {
			method: 'get',
			headers: {
				authorization: Payload,
			},
		});
		return await res.json();
	});
	if (!data.status) {
		console.log(data.msg);
	}
	return { server: data.server, channels: data.channels };
};

type GetChannelInfoResponse = {
	status: boolean;
	channel: Channel;
	server: Server;
	msg: string;
};

export const GetChannelInfo = async (
	URL: string,
	Payload: string,
	ServerId: string,
	ChannelId: string
) => {
	const data: GetChannelInfoResponse = await EasyTryCatch(async () => {
		const res = await fetch(`${URL}/data/channels/${ServerId}/${ChannelId}`, {
			method: 'get',
			headers: {
				authorization: Payload,
			},
		});
		return await res.json();
	});
	if (!data.status) {
		console.log(data.msg);
	}
	return { server: data.server, channel: data.channel };
};

type GetServersByQueryResponse = {
	status: boolean;
	servers: Server[];
	msg: string;
};

export const GetServersByQuery = async (
	URL: string,
	Payload: string,
	query: Object
) => {
	const data: GetServersByQueryResponse = await EasyTryCatch(async () => {
		const res = await fetch(`${URL}/data/servers/query`, {
			method: 'post',
			headers: {
				authorization: Payload,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(query),
		});
		return await res.json();
	});
	if (!data.status) {
		console.log(data.msg);
	}
	return data.servers;
};
