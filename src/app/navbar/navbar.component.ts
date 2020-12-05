import { Component, OnInit } from '@angular/core';
import * as fa from '@fortawesome/free-solid-svg-icons';
import {AuthenticationService} from '@app/_services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  icons = fa;

  isCollapsed = {customers: true};

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
  }

  clientsMenuCollapse(menu): void {
    this.isCollapsed[menu] = !this.isCollapsed[menu];
  }

  async logout(): Promise<void> {
    this.authService.logout();
    await this.router.navigateByUrl('/login');
  }
}
