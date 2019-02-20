import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';

import {Company, Product, User} from '../../_models';
import {UserService, AuthenticationService, ProductService} from '../../_services';
import {CompanyService} from "../../_services/company.service";

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  selectedCompany: Company;
  selectedProduct: Product;
  allProducts: Product[];
  @ViewChild('productModal') proModal;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private companiesSearvice: CompanyService,
    private productService: ProductService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
    this.companiesSearvice.allProducts.subscribe(x => this.allProducts = x);
    this.productService.currentProduct.subscribe(product => this.selectedProduct = product);
  }

  ngOnInit() {
    // this.loadAllUsers();
    this.companiesSearvice.currentCompany.subscribe(company => this.selectedCompany = company);

  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }

  showProductModal() {
    this.proModal.show();
  }

  closeProductModal() {
    this.proModal.hide();
  }
  onClosed(event: any) {

  }

  onClose(event: any) {

  }

  onOpened(event: any) {

  }

  onOpen(event: any) {

  }

  // deleteUser(id: number) {
  //     this.userService.delete(id).pipe(first()).subscribe(() => {
  //         this.loadAllUsers()
  //     });
  // }

  // private loadAllUsers() {
  //     this.userService.getAll().pipe(first()).subscribe(users => {
  //         this.users = users;
  //     });
  // }
}
