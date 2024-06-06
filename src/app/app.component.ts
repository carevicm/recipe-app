import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private renderer: Renderer2, private router: Router) {}

  ngOnInit() {
    this.authService.autoLogin();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.renderer.setStyle(document.body, 'background-color', '#F8F6F0');
      }
    });
  }
  
}
