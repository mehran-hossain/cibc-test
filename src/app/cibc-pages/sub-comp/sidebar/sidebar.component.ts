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

  getRouteForButton(button: any): string {
    switch(button.label) {
      case 'Home':
        return '/cibc-home';
      case 'Account Details':
        return '#';
      case 'My Documents':
        return '#';
      default:
        return '#';
    }
  }
}
