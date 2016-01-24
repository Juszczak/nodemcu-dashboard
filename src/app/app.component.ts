import {
	Component,
	NgZone
} from 'angular2/core';

import {
	ROUTER_DIRECTIVES,
	RouteConfig,
	Router,
	Location
} from 'angular2/router';

import {NavComponent} from './nav/nav.component.ts';

import {ConsoleComponent} from './console/console.component.ts';
import {DashboardComponent} from './dashboard/dashboard.component.ts';
import {HomeComponent} from './home/home.component.ts';

@Component({
	directives: [
		ConsoleComponent,
		DashboardComponent,
		HomeComponent,
		NavComponent,
		ROUTER_DIRECTIVES,
	],
	selector: 'app',
	styles: [require('./app.styles.styl')],
	template: require('./app.template.html')
})
@RouteConfig([
  { path: '/', component: HomeComponent, name: 'Home' },
  { path: '/console', component: ConsoleComponent, name: 'Console' },
  { path: '/dashboard', component: DashboardComponent, name: 'Dashboard' },
	{ path: '/**', redirectTo: ['Home'] }
])
export class AppComponent {
	router: Router;
	location: Location;

	constructor(router: Router, location: Location) {
		this.router = router;
		this.location = location;
	}
}
