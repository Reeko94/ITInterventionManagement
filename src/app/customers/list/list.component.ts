import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService, CustomersService} from '@app/_services';
import {Customer} from '@app/_models/customer';
import {ColumnMode} from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  ColumnMode = ColumnMode;
  loading = false;
  customers: Customer[];
  columns = [
    {name: 'Prénom', prop: 'firstname'},
    {name: 'Nom', prop: 'lastname'},
    {name: 'Email', prop: 'email'},
    {name: 'Téléphone', prop: 'phone'},
    {name: 'Addresse', prop: 'address'},
    {name: 'Code Postal', prop: 'zipcode'},
    {name: 'Ville', prop: 'city'}
    ];

  constructor(private customerService: CustomersService) { }

  ngOnInit(): void {
    this.loading = true;
    this.customerService.getAll().subscribe(customers => {
      this.customers = customers;
      this.loading = false;
    });
  }

}
