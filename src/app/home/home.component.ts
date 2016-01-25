import {
	Component
} from 'angular2/core';

import {
	SetupComponent
} from '../components/setup/setup.component.ts';

@Component({
	directives: [
		SetupComponent
	],
	selector: 'home',
	styles: [require('./home.styles.styl')],
	template: require('./home.template.html')
})
export class HomeComponent {
}
