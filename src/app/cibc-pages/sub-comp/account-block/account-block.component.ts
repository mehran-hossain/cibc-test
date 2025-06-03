import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-account-block',
  imports: [CommonModule],
  templateUrl: './account-block.component.html',
  styleUrls: ['./account-block.component.css']
})
export class AccountBlockComponent {
  @Input() accountType: string = '';
  @Input() accountNumber: string = '';
  @Input() balance: number = 0;
  @Input() cardImage: string = '';
}