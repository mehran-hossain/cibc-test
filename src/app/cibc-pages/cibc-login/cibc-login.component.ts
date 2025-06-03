import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-cibc-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cibc-login.component.html',
  styleUrl: './cibc-login.component.css'
})
export class CibcLoginComponent {
  cardNumber: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private router: Router
  ) {}

  onSignOn() {
    if (!this.cardNumber || !this.password) {
      this.errorMessage = 'Please enter both card number and password';
      return;
    }

    this.loginService.login(this.cardNumber, this.password).subscribe({
      next: (response) => {
        // Store user data including account balances
        this.userService.setUser(response.user);
        this.router.navigate(['/cibc-home']);
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'Login failed. Please try again.';
      }
    });
  }
} 