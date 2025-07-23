import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../sub-comp/navbar/navbar.component';
import { SidebarComponent } from '../../sub-comp/sidebar/sidebar.component';
import { SidebarService, SidebarConfig } from '../../../services/sidebar.service';

@Component({
  selector: 'app-cibc-add-edit-payees',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent, SidebarComponent],
  templateUrl: './cibc-add-edit-payees.component.html',
  styleUrl: './cibc-add-edit-payees.component.css'
})
export class CibcAddEditPayeesComponent implements OnInit {
  sidebarConfig: SidebarConfig = {
    mainButtons: [],
    sections: []
  };

  companyName: string = '';

  constructor(
    public sidebarService: SidebarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sidebarConfig = this.sidebarService.getSidebarConfig('home');
  }

  onSearchSubmit(): void {
    if (this.companyName.trim()) {
      // Navigate to search results with the company name as a query parameter
      this.router.navigate(['/payee-search-results'], {
        queryParams: { companyName: this.companyName.trim() }
      });
    }
  }
} 