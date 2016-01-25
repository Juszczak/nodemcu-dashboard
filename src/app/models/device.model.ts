export class DeviceModel {
	public id: number;
	public model: string;
	public name: string;
	public connected: boolean;
	public url: string;

	constructor(name: string, model?: string, url?: string) {
		this.id = Date.now();
		this.name = name;
		this.model = model;
		this.connected = false;
		this.url = url;
	}
}
