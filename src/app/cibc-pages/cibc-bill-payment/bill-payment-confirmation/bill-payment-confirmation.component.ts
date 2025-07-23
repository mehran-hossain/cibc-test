import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../sub-comp/navbar/navbar.component';
import { SidebarComponent } from '../../sub-comp/sidebar/sidebar.component';
import { SidebarService, SidebarConfig } from '../../../services/sidebar.service';
import { CommonModule } from '@angular/common';
import { Router, NavigationExtras, RouterModule } from '@angular/router';

@Component({
  selector: 'app-bill-payment-confirmation',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, SidebarComponent],
  templateUrl: './bill-payment-confirmation.component.html',
  styleUrl: './bill-payment-confirmation.component.css'
})
export class BillPaymentConfirmationComponent implements OnInit {
  sidebarConfig: SidebarConfig;
  referenceNumber: string = '123456';
  payee: string = '';
  account: string = '';
  amount: string = '';
  paymentDate: string = '';
  timeReceived: string = '';

  constructor(public sidebarService: SidebarService, private router: Router) {
    this.sidebarConfig = this.sidebarService.getSidebarConfig('home');
  }

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    const state = (nav?.extras?.state as any) || history.state;
    this.payee = state.payee || '';
    this.account = state.account || '';
    this.amount = state.amount || '';
    this.paymentDate = state.paymentDate || '';
    this.timeReceived = new Date().toLocaleTimeString();
  }
} 