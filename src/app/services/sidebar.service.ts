import { Injectable } from '@angular/core';
import { ASSETS } from '../constants/app.constants';

export interface SidebarButton {
  icon: string;
  label: string;
}

export interface SidebarSection {
  title: string;
  items: string[];
}

export interface SidebarConfig {
  mainButtons: SidebarButton[];
  sections: SidebarSection[];
}

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebarConfigs: { [key: string]: SidebarConfig } = {
    'home': {
      mainButtons: [
        { icon: ASSETS.ICONS.HOME, label: 'Home' },
        { icon: ASSETS.ICONS.ACCOUNT, label: 'Account Details' },
        { icon: ASSETS.ICONS.DOCUMENTS, label: 'My Documents' }
      ],
      sections: [
        {
          title: 'Move Money',
          items: ['Bill Payments', 'Transfer Funds', 'Interac e-Transfer']
        },
        {
          title: 'Advice',
          items: ['Net Worth', 'Help Centre', 'Customer Service']
        },
        {
          title: 'More',
          items: [
            'Global Money Transfer',
            'Order Foreign Cash',
            'Buy Gold and Silver',
            'Check Credit Score',
            'Download Transactions',
            'Manage Upcoming Transactions',
            'Document Delivery Preferences',
            'Request Centre'
          ]
        },
        {
          title: 'Settings',
          items: [
            'Manage My Card',
            'Manage My Alerts',
            'Preference Centre',
            'Account Security',
            'Statment Preferences'
          ]
        }
      ]
    }
  };

  getSidebarConfig(pageId: string): SidebarConfig {
    return this.sidebarConfigs[pageId] || this.sidebarConfigs['home'];
  }

  addSidebarConfig(pageId: string, config: SidebarConfig) {
    this.sidebarConfigs[pageId] = config;
  }

  // Centralized navigation methods
  getRouteForButton(button: any): string {
    switch(button.label) {
      case 'Home':
        return '/cibc-home';
      case 'Account Details':
        return '#';
      case 'My Documents':
        return '#';
      default:
        return '#';
    }
  }

  getRouteForItem(item: string): string {
    switch(item) {
      case 'Bill Payments':
        return '/cibc-bill-payment';
      default:
        return '#';
    }
  }
} 