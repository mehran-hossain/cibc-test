import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../sub-comp/navbar/navbar.component";
import { SidebarComponent } from "../../sub-comp/sidebar/sidebar.component";
import { SidebarService, SidebarConfig } from "../../../services/sidebar.service";

@Component({
  selector: 'app-cibc-bill-payment',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SidebarComponent],
  templateUrl: './cibc-bill-payment.component.html',
  styleUrl: './cibc-bill-payment.component.css'
})
export class CibcBillPaymentComponent implements OnInit {
  sidebarConfig: SidebarConfig = {
    mainButtons: [],
    sections: []
  };

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.sidebarConfig = this.sidebarService.getSidebarConfig('home');
  }
}
