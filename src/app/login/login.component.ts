import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '@app/_services';
import * as fa from '@fortawesome/free-solid-svg-icons';

@Component({ templateUrl: 'login.component.html', styleUrls: ['./login.component.scss'], encapsulation: ViewEncapsulation.None })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    error = '';
    fa = fa;

  constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    // get return url from route parameters or default to '/'
                    const returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
                    this.router.navigate([returnUrl]);
                },
                error: error => {
                    this.error = error;
                    this.loading = false;
                }
            });
    }
}
