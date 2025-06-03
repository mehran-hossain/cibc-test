import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-right-rect-block',
  imports: [CommonModule],
  templateUrl: './right-rect-block.component.html',
  styleUrl: './right-rect-block.component.css'
})
export class RightRectBlockComponent {
    @Input() icon: string = '';
    @Input() text: string = '';
}
