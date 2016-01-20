import Immutable = require('immutable');

export class LineModel {
	public name: string;
	public timestamp: number;
	public text: string;
	public status: boolean;
	public incomming: boolean;

	constructor(text: string, incomming?: boolean) {
		this.timestamp = Date.now();
		this.text = text;
		this.incomming = incomming || false;
	}
}
