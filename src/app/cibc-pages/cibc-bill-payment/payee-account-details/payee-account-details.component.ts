import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../sub-comp/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../sub-comp/sidebar/sidebar.component';
import { SidebarService, SidebarConfig } from '../../../services/sidebar.service';
import { ActivatedRoute } from '@angular/router';
import { PayeeService, Payee } from '../../../services/payee.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PayeeVerificationModalComponent } from '../payee-verification-modal/payee-verification-modal.component';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-payee-account-details',
  imports: [NavbarComponent, SidebarComponent, CommonModule, FormsModule, RouterModule, PayeeVerificationModalComponent],
  standalone: true,
  templateUrl: './payee-account-details.component.html',
  styleUrl: './payee-account-details.component.css'
})
export class PayeeAccountDetailsComponent implements OnInit {
  sidebarConfig: SidebarConfig = {
    mainButtons: [],
    sections: []
  };

  payee: Payee | null = null;
  nickname: string = '';
  accountNumber: string = '';
  showVerificationModal = false;

  constructor(
    public sidebarService: SidebarService,
    private route: ActivatedRoute,
    private payeeService: PayeeService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    console.log('PayeeAccountDetailsComponent ngOnInit called');
    this.sidebarConfig = this.sidebarService.getSidebarConfig('home');
    const payeeId = this.route.snapshot.paramMap.get('id');
    console.log('Payee ID from route:', payeeId);
    
    if (payeeId) {
      console.log('Making API call to get payee by ID:', payeeId);
      this.payeeService.getPayeeById(payeeId).subscribe({
        next: (res) => {
          console.log('API response received:', res);
          this.payee = res.payee;
          console.log('Payee object set:', this.payee);
        },
        error: (error) => {
          console.error('Error fetching payee:', error);
        }
      });
    } else {
      console.log('No payee ID found in route');
    }
  }

  onNextClick() {
    this.showVerificationModal = true;
  }

  onModalCancel() {
    this.showVerificationModal = false;
  }

  onModalBack() {
    this.showVerificationModal = false;
    // Optionally, handle back navigation logic here
  }

  onModalAdd() {
    this.showVerificationModal = false;
    const user = this.userService.getUser();
    if (user && this.payee) {
      this.payeeService.addUserPayee(user.username, this.payee, this.nickname, this.accountNumber)
        .subscribe({
          next: (res) => {
            alert('Payee added successfully!');
            // Optionally, navigate or update UI
          },
          error: (err) => {
            alert('Failed to add payee.');
          }
        });
    } else {
      alert('User not logged in or payee not loaded.');
    }
  }
}
