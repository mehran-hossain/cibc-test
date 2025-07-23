import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../../sub-comp/navbar/navbar.component';
import { SidebarComponent } from '../../sub-comp/sidebar/sidebar.component';
import { SidebarService, SidebarConfig } from '../../../services/sidebar.service';
import { PayeeService, Payee } from '../../../services/payee.service';

@Component({
  selector: 'app-payee-search-results',
  imports: [CommonModule, RouterModule, HttpClientModule, NavbarComponent, SidebarComponent],
  standalone: true,
  templateUrl: './payee-search-results.component.html',
  styleUrl: './payee-search-results.component.css'
})
export class PayeeSearchResultsComponent implements OnInit {
  sidebarConfig: SidebarConfig = {
    mainButtons: [],
    sections: []
  };

  searchResults: Payee[] = [];
  leftColumn: Payee[] = [];
  rightColumn: Payee[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    public sidebarService: SidebarService,
    private payeeService: PayeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sidebarConfig = this.sidebarService.getSidebarConfig('home');
    
    // Get the search term from query parameters
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['companyName'] || '';
      if (this.searchTerm) {
        this.performSearch();
      }
    });
  }

  performSearch(): void {
    if (!this.searchTerm.trim()) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.payeeService.searchPayees(this.searchTerm).subscribe({
      next: (response) => {
        this.searchResults = response.payees;
        this.splitColumns();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error searching payees:', error);
        this.errorMessage = 'An error occurred while searching. Please try again.';
        this.isLoading = false;
      }
    });
  }

  splitColumns(): void {
    this.leftColumn = [];
    this.rightColumn = [];
    this.searchResults.forEach((payee, i) => {
      if (i % 2 === 0) {
        this.leftColumn.push(payee);
      } else {
        this.rightColumn.push(payee);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/cibc-add-edit-payees']);
  }

  selectPayee(payee: Payee): void {
    this.router.navigate(['/payee-account-details', payee.id]);
  }
}
