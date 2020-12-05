import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    user: User;

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.loading = true;
        this.user = JSON.parse(localStorage.getItem('currentUser'));
    }
}
