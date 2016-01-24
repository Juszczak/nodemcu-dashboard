import {
	Component,
	EventEmitter,
	Output
} from 'angular2/core';

import {
	ROUTER_DIRECTIVES,
	RouteConfig,
	Router,
	Location
} from 'angular2/router';

@Component({
	directives: [
		ROUTER_DIRECTIVES
	],
	selector: 'nav[navigation]',
	template: require('./nav.template.html')
})
export class NavComponent {
}
