import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cibc-login',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cibc-login.component.html',
  styleUrl: './cibc-login.component.css'
})
export class CibcLoginComponent {

}
