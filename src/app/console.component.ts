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
	private commandIndex: number = 0;
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
		this.appendLine(this.currentCommand);
		this.currentCommandString = "";
		this.commandIndex = 0;
	}

	private processIncommingMessage(line: LineModel): void {
		const isPrompt: boolean = new RegExp('> ').test(line.text);
		const isWhitespace: boolean = new RegExp('(\s)|(\t)|(\n)').test(line.text);
		if (!isPrompt && !isWhitespace) {
			this.appendLine(line);
		}	}

	private appendLine(line: LineModel): void {
		this.commands = this.commands.push(line);
	}

	private submitCommand(event: Event): void {
		event.preventDefault();
		let commandString: string = this.commandPrompt.value.command;
		this.currentCommand = new LineModel(commandString);
		this.sendCurrentCommand();
	}

	private applyPreviousCommand(): void {
		if (this.commands.size === 0) {
			return;
		}

		const previousCommands: Immutable.List<LineModel> = this.commands.filter(line => {
			return !line.incomming;
		}).toList();

		const index: number = previousCommands.size - 1 - this.commandIndex;
		if (index < 1) {
			this.currentCommandString = previousCommands.get(0).text;
		} else {
			this.currentCommandString = previousCommands.get(index).text;
			this.commandIndex += 1;
		}
		this.commandInput.nativeElement.focus();
	}

	private applyNextCommand(): void {
		if (this.commands.size === 0) {
			return;
		}

		const previousCommands: Immutable.List<LineModel> = this.commands.filter(line => {
			return !line.incomming;
		}).toList();

		this.commandIndex -= 1;

		const index: number = previousCommands.size - 1 - this.commandIndex;

		if (index > previousCommands.size - 1) {
			this.currentCommandString = '';
			this.commandIndex = 0;
		} else {
			this.currentCommandString = previousCommands.get(index).text;
		}
	}

	private onKeyDown(event: KeyboardEvent, input: HTMLInputElement): void {
		const keyCode: number = event.keyCode;
		switch (keyCode) {
			case 9: // tab
				// @todo: completions
				event.preventDefault();
			break;
			case 38: // up
				event.preventDefault();
				this.applyPreviousCommand();
			break;
			case 40: // down
				event.preventDefault();
				this.applyNextCommand();
			break;
			default:
				this.commandIndex = 0;
			break;
		}
	}

	private resendCommand(event: MouseEvent, command: LineModel): void {
		this.currentCommand = new LineModel(command.text);
		this.sendCurrentCommand();
		this.commandInput.nativeElement.focus();
	}

	private editLine(event: MouseEvent, command: LineModel): void {
		this.currentCommandString = command.text;
		this.commandInput.nativeElement.focus();
	}
}
