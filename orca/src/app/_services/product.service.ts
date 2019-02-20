import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';

import {Company, Product} from "../_models";
import {catchError, map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import * as _ from 'lodash';
import {CompanyService} from "./company.service";

@Injectable({ providedIn: 'root' })
export class ProductService {
  private currentProductSubject: BehaviorSubject<Product>;
  public currentProduct: Observable<Product>;

  private allProductsSubject: BehaviorSubject<Product[]>;
  public allProducts: Observable<Product[]>;

  private openProductSubject: BehaviorSubject<boolean>;
  public openProduct: Observable<boolean>;

  public selectedCompany;

  constructor(private http: HttpClient, private companiesSearvice: CompanyService) {
    this.currentProductSubject = new BehaviorSubject<Product>(JSON.parse(localStorage.getItem('currentProduct')));
    this.currentProduct = this.currentProductSubject.asObservable();
    this.companiesSearvice.currentCompany.subscribe(company => this.selectedCompany = company);

    this.allProductsSubject = new BehaviorSubject<Product[]>(JSON.parse(localStorage.getItem('allProducts')));
    this.allProducts = this.allProductsSubject.asObservable();

    this.openProductSubject = new BehaviorSubject<boolean>(false);
    this.openProduct = this.openProductSubject.asObservable();
  }

  public get currentProductValue(): Product {
    return this.currentProductSubject.value;
  }

  changeProduct(product) {
    this.currentProductSubject.next(product);
  }

  addProduct(product) {
    return this.http.post<Product>(`http://localhost:3000/companies/${this.selectedCompany._id}/products/add` , product)
      .pipe(map(company => {
        return this.companiesSearvice.getAll().subscribe();
      }));
  }

  editProduct(product) {
    return this.http.patch<Product>(`http://localhost:3000/companies/${this.selectedCompany._id}/products/${this.currentProductValue._id}` , product)
      .pipe(map(company => {
        return this.companiesSearvice.getAll().subscribe();
      }));
  }

  productToggle(toggle) {
    this.openProductSubject.next(toggle);
  }
}
