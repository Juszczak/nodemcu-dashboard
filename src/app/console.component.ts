import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	NgZone,
	Output,
	QueryList,
	ViewChild
} from 'angular2/core';

import {
	ControlGroup,
	FormBuilder,
	Validators
} from 'angular2/common';

import {
	SocketService
} from './socket.service.ts'

import {
	LineModel
} from './line.model.ts';

import Immutable = require('immutable');

@Component({
	directives: [
	],
	selector: 'console',
	template: require('./console.template.html')
})
export class ConsoleComponent implements AfterViewInit {
	@Output() private eventEmitter: EventEmitter<string> = new EventEmitter();
	private commandPrompt: ControlGroup;
	private commands: Immutable.List<LineModel> = Immutable.List<LineModel>();
	private currentCommandString: string = "";
	private currentCommand: LineModel;
	private socket: SocketService;
	private zone: NgZone;
	@ViewChild('command') private commandInput: ElementRef;

	constructor(formBuilder: FormBuilder, zone: NgZone) {
		this.commandPrompt = formBuilder.group({
			command: ["", Validators.required]
		});
		this.zone = zone;
	}

	ngAfterViewInit() {
		this.commandInput.nativeElement.focus();
		this.socket = new SocketService(this.zone);
		this.socket.connect();
		this.socket.messageEmitter.subscribe((line: LineModel) => {
			this.processIncommingMessage(line);
		})
	}

	private sendCurrentCommand(): void {
		this.socket.send(this.currentCommand);
	}

	private processIncommingMessage(line: LineModel): void {
		const isJustPrompt = new RegExp('> ').test(line.text);
		if (!isJustPrompt) {
			this.appendLine(line);
		}	}

	private appendLine(line: LineModel): void {
		this.commands = this.commands.push(line);
	}

	private submitCommand(event: Event): void {
		event.preventDefault();
		let commandString: string = this.commandPrompt.value.command;
		this.currentCommand = new LineModel(commandString);
		this.appendLine(this.currentCommand);
		this.sendCurrentCommand();
		this.currentCommandString = "";
	}

	private applyPreviousCommand(): void {
		// @todo
		// let currentCommandIndex: number = this.commands.indexOf(this.currentCommand);
		// if (currentCommandIndex < 0) {
		// 	currentCommandIndex = this.commands.size;
		// }
		// const previousCommand: string = this.commands.get(currentCommandIndex - 1);
		// this.currentCommand = previousCommand;
	}

	private applyNextCommand(): void {
		// @todo
		// let currentCommandIndex: number = this.commands.indexOf(this.currentCommand);
		// const previousCommand: string = this.commands.get(currentCommandIndex + 1);
		// this.currentCommand = previousCommand;
	}

	private onKeyDown(event: KeyboardEvent, input: HTMLInputElement): void {
		const keyCode: number = event.keyCode;
		switch (keyCode) {
			case 9: // tab
				// @todo: completions
				event.preventDefault();
			break;
			case 38: // up
				this.applyPreviousCommand();
			break;
			case 40: // down
				this.applyNextCommand();
			break;
		}
	}
}
