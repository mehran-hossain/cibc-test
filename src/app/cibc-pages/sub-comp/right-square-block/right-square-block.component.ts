import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-right-square-block',
  imports: [CommonModule],
  templateUrl: './right-square-block.component.html',
  styleUrl: './right-square-block.component.css'
})
export class RightSquareBlockComponent {
  @Input() icon: string = '';
  @Input() text: string = '';
  @Input() icon2: string = '';
  @Input() text2: string = '';
}
