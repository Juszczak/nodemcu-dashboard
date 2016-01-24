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


import {ConsoleComponent} from './console/console.component.ts';
import {DashboardComponent} from './dashboard/dashboard.component.ts';
import {HomeComponent} from './home/home.component.ts';

@Component({
		directives: [
			ConsoleComponent,
			DashboardComponent,
			HomeComponent,
			ROUTER_DIRECTIVES,
		],
		selector: 'app',
		styles: [`
			:host {
				font-family: monospace;
			}
		`],
		template: `
			<style>
				.navigation {
					margin: 0 0 10px 0
				}
			</style>
			<nav class="navigation">
				<a [routerLink]="['/Home']">home</a>
				<a [routerLink]="['/Console']">console</a>
				<a [routerLink]="['/Dashboard']">dashboard</a>
			</nav>
			<router-outlet></router-outlet>
			`
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
