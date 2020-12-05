import { Component, OnInit } from '@angular/core';
import * as fa from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  icons = fa;

  isCollapsed = {customers: true};

  ngOnInit(): void {
  }

  clientsMenuCollapse(menu): void {
    this.isCollapsed[menu] = !this.isCollapsed[menu];
  }
}
