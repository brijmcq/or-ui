import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'onerent-ui';
  navItems = [
    { route: '/', icon: 'home', title: 'Home' },
    { route: '/users', icon: 'people', title: 'Users' },
    { route: '/properties', icon: 'building', title: 'Properties' }
  ];
}
