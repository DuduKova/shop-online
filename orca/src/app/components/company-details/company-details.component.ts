import { Component, OnInit } from '@angular/core';
import {DataService} from "../../_services/data.service";
import {CompanyService} from "../../_services/company.service";

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  public selectedCompany;

  constructor(private companiesSearvice: CompanyService) { }

  ngOnInit() {
    this.companiesSearvice.currentCompany.subscribe(company => this.selectedCompany = company);
  }

}
