import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() title: string = '';
  @Input() items: string[] = [];

  getRouteForItem(item: string): string {
    switch(item) {
      case 'Bill Payments':
        return '/cibc-bill-payment';
      default:
        return '#';
    }
  }
}
