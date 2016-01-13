import {Component} from 'angular2/core';

import {ConsoleComponent} from './app/console.component.ts';

@Component({
		directives: [
			ConsoleComponent
		],
		selector: 'app',
		template: `
			hello nodemcu
			<console></console>
			`
})
export class AppComponent { }
