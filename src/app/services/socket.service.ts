import {
	EventEmitter,
	Inject,
	Injectable,
	Output,
	NgZone
} from 'angular2/core';

import {
	LineModel
} from '../models/line.model.ts';

@Injectable()
export class SocketService {
	public messageEmitter: EventEmitter<LineModel>;

	static ESP8266_URL: string = 'ws://192.168.1.6/esp8266';

	private socket: WebSocket;
	private zone: NgZone;

	constructor(zone: NgZone) {
		this.zone = zone;
		this.messageEmitter = new EventEmitter<LineModel>();
	}

	public send(message: LineModel): void {
		try {
			this.socket.send(message.text);
		} catch (exception) {
			message.status = false;
			console.group(`Not sent: ${message.text}`);
			console.error('CODE:  ', (<DOMException>exception).code);
			console.error('NAME:  ', (<DOMException>exception).name);
			console.error('MESSAGE', (<DOMException>exception).message);
			console.groupEnd();
		}
	}

	public connect(): void {
		try {
			this.socket = new WebSocket(SocketService.ESP8266_URL);
			this.socket.onopen = (event: Event) => {
				this.messageEmitter.emit(new LineModel(`connected to ${this.socket.url}`, true));
			};
			this.socket.onmessage = (event: MessageEvent) => {
				this.onSocketMessage(event);
			}
			this.socket.onclose = (event: CloseEvent) => {
				this.messageEmitter.emit(new LineModel(`disconnected`, true));
			}
		} catch (error) {
			console.info('catched', error);
		}
	}

	public disconnect(): void {
		this.socket.close();
	}

	private onSocketMessage(event: MessageEvent): void {
		this.messageEmitter.emit(new LineModel(event.data, true));
	}
}
