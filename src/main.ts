import './vendor.ts';

import {FORM_PROVIDERS} from 'angular2/common';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {Type} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

import {AppComponent} from './app.component.ts'

document.addEventListener('DOMContentLoaded', () => {
	if (window.self === window.top) {
		bootstrap(<Type>AppComponent, [
				FORM_PROVIDERS,
				HTTP_PROVIDERS,
				ROUTER_PROVIDERS
		]);
	}
});

