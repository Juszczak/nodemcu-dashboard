import Immutable = require('immutable');

export class LineModel {
	public name: string
	public timestamp: number;
	public text: string;
	public status: boolean;

	constructor(text: string) {
		this.timestamp = Date.now();
		this.text = text;
	}
}
