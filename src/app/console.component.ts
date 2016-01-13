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
	template: `
		<div class="log">
			<div *ngFor="#command of commands">
				{{command}}
			</div>
		</div>
		<form [ngFormModel]="commandPrompt" (submit)="inputCommand($event)">
			<label>&gt;
				<input [(ngModel)]="currentCommand" ngControl="command" type="text" placeholder="">
			</label>
		</form>
	`
})
export class ConsoleComponent {
	@Output() private eventEmitter: EventEmitter<String> = new EventEmitter();
	private commandPrompt: ControlGroup;
	private commands: Array<String> = new Array<String>();
	private currentCommand: String = "";
	constructor(formBuilder: FormBuilder) {
		this.commandPrompt = formBuilder.group({
			command: ["", Validators.required]
		});
	}
	private inputCommand(event: Event): void {
		event.preventDefault();
		let commandString: String = this.commandPrompt.value.command;
		this.commands.push(commandString);
		this.currentCommand = "";
	}
}
