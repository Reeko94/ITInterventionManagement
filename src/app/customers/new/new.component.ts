import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomersService} from "@app/_services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  public newClientForm: FormGroup;
  public submitted = false;
  public error: string;

  constructor(private formBuilder: FormBuilder, private customerService: CustomersService, private router: Router) { }

  ngOnInit(): void {
    this.newClientForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.min(1)]],
      lastname: ['', [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(new RegExp('^(?:(?:\\+|00)33[\\s.-]{0,3}(?:\\(0\\)[\\s.-]{0,3})?|0)[1-9](?:(?:[\\s.-]?\\d{2}){4}|\\d{2}(?:[\\s.-]?\\d{3}){2})$'))]],
      address: [''],
      zipcode: [''],
      city: ['']
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.newClientForm.invalid) {
      return;
    }
    this.customerService.register(this.formData).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/customers']);
      },
      error: error => {
        this.error = error;
      }
    });
  }

  get formData(): { [p: string]: AbstractControl } { return this.newClientForm.controls; }

}
