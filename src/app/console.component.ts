import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	Output,
	ViewChild,
	QueryList
} from 'angular2/core';

import {
	ControlGroup,
	FormBuilder,
	Validators
} from 'angular2/common';

import Immutable = require('immutable');

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	directives: [
	],
	selector: 'console',
	template: require('./console.template.html')
})
export class ConsoleComponent implements AfterViewInit {
	@Output() private eventEmitter: EventEmitter<string> = new EventEmitter();
	private commandPrompt: ControlGroup;
	private commands: Immutable.List<string> = Immutable.List<string>();
	private currentCommand: string = "";
	@ViewChild('command') private commandInput: ElementRef;

	constructor(formBuilder: FormBuilder) {
		this.commandPrompt = formBuilder.group({
			command: ["", Validators.required]
		});
	}

	ngAfterViewInit() {
		console.info(this.commandInput);
		this.commandInput.nativeElement.focus();
	}

	private getterCounter: number = 0;
	private iterations: number = 0;

	private sendCurrentCommand(): void {
		// @todo
		console.warn(this.currentCommand);
	}

	private inputCommand(event: Event): void {
		event.preventDefault();
		let commandString: string = this.commandPrompt.value.command;
		this.sendCurrentCommand();
		this.commands = this.commands.push(commandString);
		this.currentCommand = "";
	}

	private applyPreviousCommand(): void {
		let currentCommandIndex: number = this.commands.indexOf(this.currentCommand);
		if (currentCommandIndex < 0) {
			currentCommandIndex = this.commands.size;
		}
		const previousCommand: string = this.commands.get(currentCommandIndex - 1);
		this.currentCommand = previousCommand;
	}

	private applyNextCommand(): void {
		let currentCommandIndex: number = this.commands.indexOf(this.currentCommand);
		const previousCommand: string = this.commands.get(currentCommandIndex + 1);
		this.currentCommand = previousCommand;
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
