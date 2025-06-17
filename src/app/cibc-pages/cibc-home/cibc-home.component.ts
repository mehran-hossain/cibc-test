import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent} from '../sub-comp/navbar/navbar.component';
import { SidebarComponent } from '../sub-comp/sidebar/sidebar.component';
import { AccountBlockComponent } from "../sub-comp/account-block/account-block.component";
import { RightSquareBlockComponent } from '../sub-comp/right-square-block/right-square-block.component';
import { RightRectBlockComponent } from '../sub-comp/right-rect-block/right-rect-block.component';
import { UserService, User } from '../../services/user.service';
import { SidebarService, SidebarConfig } from '../../services/sidebar.service';

@Component({
  selector: 'app-cibc-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SidebarComponent, AccountBlockComponent, RightSquareBlockComponent, RightRectBlockComponent],
  templateUrl: './cibc-home.component.html',
  styleUrl: './cibc-home.component.css'
})
export class CibcHomeComponent implements OnInit {
  moveMoneyItems = [
    'Bill Payments',
    'Transfer Funds',
    { label: 'Interac e-Transfer', italic: true }
  ];
  showNote = false;
  showTrademarks = false;

  // User account data
  user: User | null = null;
  chequingBalance: number = 0;
  savingsBalance: number = 0;
  visaBalance: number = 0;
  totalBalance: number = 0;

  // Sidebar configuration
  sidebarConfig: SidebarConfig = {
    mainButtons: [],
    sections: []
  };

  constructor(
    private userService: UserService,
    private sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    // Get sidebar configuration
    this.sidebarConfig = this.sidebarService.getSidebarConfig('home');
    
    // Get user data and set account balances
    this.user = this.userService.getUser();
    if (this.user) {
      this.chequingBalance = this.user.accounts.chequing.balance;
      this.savingsBalance = this.user.accounts.savings.balance;
      this.visaBalance = this.user.accounts.visa.balance;
      this.totalBalance = this.userService.getTotalBalance();
    }
  }
} 