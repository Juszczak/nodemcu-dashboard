import {
	Component
} from 'angular2/core';

import {
	ControlGroup,
	FormBuilder,
	Validators
} from 'angular2/common';

import {
	DeviceModel
} from '../../models/device.model.ts';

import {
	SetupService
} from './setup.service.ts';

import Immutable = require('immutable');

@Component({
	directives: [
	],
	selector: 'setup',
	styles: [require('./setup.styles.styl')],
	template: require('./setup.template.html')
})
export class SetupComponent {
	private devices: Immutable.OrderedSet<DeviceModel>;
	private selectedDevice: DeviceModel;
	private editing: boolean = false;
	private editDeviceForm: ControlGroup;
	private setupService: SetupService;

	constructor(formBuilder: FormBuilder) {
		this.devices = Immutable.OrderedSet<DeviceModel>();
		this.editDeviceForm = formBuilder.group({
			name: ["", Validators.required],
			model: ["", Validators.required],
			url: ["", Validators.required]
		});

		this.setupService = new SetupService();

		this.devices = this.setupService.setup;
	}

	get editorVisible(): boolean {
		return this.editing;
	}

	get status(): boolean {
		this.devices.forEach(device => {
			if (device.connected) {
				return true;
			}
		});
		return false;
	}

	private isSelected(device: DeviceModel) {
		if (!this.selectedDevice) {
			return false;
		} else {
			return this.selectedDevice === device;
		}
	}

	private saveDevice(event: Event): void {
		event.preventDefault();

		if (this.editDeviceForm.valid) {
			let name: string = this.editDeviceForm.value.name;
			let model: string = this.editDeviceForm.value.model;
			let url: string = this.editDeviceForm.value.url;
			const device = new DeviceModel(name, model, url);
			this.devices = this.devices.add(device);
			this.editing = false;
		}
	}

	private openEmptyEditor(event: MouseEvent): void {
		event.preventDefault();
		this.selectedDevice = null;
		this.editing = true;
	}
}

