import {
	Component,
	EventEmitter,
	Output
} from 'angular2/core';

import {
	ControlGroup,
	FormBuilder,
	Validators
} from 'angular2/common';

@Component({
	directives: [
	],
	selector: 'console',
	template: require('./console.template.html')
})
export class ConsoleComponent {
	@Output() private eventEmitter: EventEmitter<string> = new EventEmitter();
	private commandPrompt: ControlGroup;
	private commands: Array<string> = new Array<string>();
	private currentCommand: string = "";
	constructor(formBuilder: FormBuilder) {
		this.commandPrompt = formBuilder.group({
			command: ["", Validators.required]
		});
	}
	private sendCurrentCommand(): void {
		// @todo
		console.debug(this.currentCommand);
	}
	private inputCommand(event: Event): void {
		event.preventDefault();
		let commandString: string = this.commandPrompt.value.command;
		this.sendCurrentCommand();
		this.commands.push(commandString);
		this.currentCommand = "";
	}
	private applyPreviousCommand(): void {
		let currentCommandIndex: number = this.commands.indexOf(this.currentCommand);
		if (currentCommandIndex < 0) {
			currentCommandIndex = this.commands.length;
		}
		const previousCommand = this.commands[currentCommandIndex - 1];
		this.currentCommand = previousCommand;
	}
	private applyNextCommand(): void {
		let currentCommandIndex: number = this.commands.indexOf(this.currentCommand);
		const previousCommand = this.commands[currentCommandIndex + 1];
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
