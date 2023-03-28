import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="container mx-auto sm:px-6 lg:px-8">
  <router-outlet></router-outlet>
</div>
  `
})
export class AppComponent {
  constructor() { }
}
