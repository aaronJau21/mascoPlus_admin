import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { TitleComponent } from '../../../shared/title/title.component';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-list-brands',
  standalone: true,
  imports: [TitleComponent, MatButtonModule, MatIconModule, MatTableModule],
  templateUrl: './list-brands.component.html',
  styleUrl: './list-brands.component.css',
})
export default class ListBrandsComponent {}
