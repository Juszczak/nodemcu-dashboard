import {
	Injectable
} from 'angular2/core';

import {
	DeviceModel
} from '../../models/device.model.ts';

import Immutable = require('immutable');

@Injectable()
export class SetupService {
	get setup(): Immutable.OrderedSet<DeviceModel> {
		let devices = Immutable.OrderedSet<DeviceModel>();
		return devices;
	}
}
