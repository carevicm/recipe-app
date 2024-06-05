import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;
  activeTab: string | null = null;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Initialize activeTab based on the current route
    const currentRoute = window.location.pathname;
    this.activeTab = this.extractActiveTab(currentRoute);

    // Subscribe to user authentication changes
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      // Update activeTab if not set
      if (!this.activeTab) {
        this.activeTab = this.isAuthenticated ? 'recipes' : 'auth';
      }
    });
  }
  extractActiveTab(route: string): string {
    // Extract the active tab from the route
    if (route.includes('recipes')) {
      return 'recipes';
    } else if (route.includes('shopping-list')) {
      return 'shopping-list';
    } else {
      return null; // Add other cases as needed
    }
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  setActive(tab: string) {
    this.activeTab = tab;
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
