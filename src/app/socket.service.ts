import {
	EventEmitter,
	Inject,
	Injectable,
	Output,
	NgZone
} from 'angular2/core';

@Injectable()
export class SocketService {
	private socket: WebSocket;
	private zone: NgZone;

	static ESP8266_URL: string = 'ws://192.168.1.6/esp8266';

	private pingInterval: number;
	private ledState: number = 0;

	private messageEmitter: EventEmitter<string>;

	constructor(zone: NgZone) {
		this.zone = zone;
		this.messageEmitter = new EventEmitter<string>();
	}

	public send(message: string): void {
		this.socket.send(message);
	}

	public connect(): void {
		this.socket = new WebSocket(SocketService.ESP8266_URL);
		this.socket.onopen = (event: Event) => {
			this.onSocketOpen(event);
		};
		this.socket.onmessage = (event: MessageEvent) => {
			this.onSocketMessage(event);
		}
		this.socket.onclose = (event: CloseEvent) => {
			window.clearInterval(this.pingInterval);
		}
	}

	public disconnect(): void {
		this.socket.close();
	}

	private onSocketMessage(event: MessageEvent): void {
		console.info(`event.data:`, event.data);
		// this.messageEmitter.emit(event.data);
	}

	private onSocketOpen(event: Event): void {
		// this.startPinging();
	}

	private ping(): void {
		this.ledState = ((this.ledState + 1) % 2);
		this.send(`=gpio.write(4, ${this.ledState})`);
	}

	public startPinging(): void {
		this.pingInterval = setInterval(() => {
			this.ping();
		}, 1000);
	}
}
