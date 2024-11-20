import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, Routes } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';

import { routes } from '../../../app.routes';

@Component({
  selector: 'shared-nav-bar',
  standalone: true,
  imports: [MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  public routesItems = signal<Routes>([]);
  public name = signal<string>('');
  ngOnInit(): void {
    this.getRoutes();
    this.getName();
  }

  getRoutes() {
    const route = routes[1].children?.filter((r) => r.title);
    this.routesItems.set(route!);
  }

  getName() {
    const user = JSON.parse(localStorage.getItem('user') as string);
    const name = user.name;
    console.log(name);
    this.name.set(name!);
  }
}
