import {
	LineModel
} from './line.model.ts';

import Immutable = require('immutable');

export class ConsoleModel {
	private list: Immutable.List<LineModel>;

	constructor() {
		this.list = Immutable.List<LineModel>();
	}

	get() {
		return this.list;
	}

	get last(): LineModel {
		if (!!this.list.size) {
			return this.list.get(this.list.size);
		} else {
			return null;
		}
	}

	public new(text: string): LineModel {
		const record = new LineModel(text);
		this.list = this.list.push(record);
		return record;
	}

	public push(element: LineModel): void {
		this.list = this.list.push(element);
	}
}
