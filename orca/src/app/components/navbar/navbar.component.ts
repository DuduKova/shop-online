import {Component, OnInit} from '@angular/core';
import {Company, Product, User} from "../../_models";
import {Router} from "@angular/router";
import {AuthenticationService, ProductService} from "../../_services";
import {CompanyService} from "../../_services/company.service";
import {Subscription} from "rxjs";
import {CartService} from "../../_services";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: User;
  selectedCompany: Company;
  currentCompanies: Company[];
  selectedProduct: Product;
  currentCompaniesSubscription: Subscription;
  isOpen = false;
  isProductOpen = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private companiesSearvice: CompanyService,
    private cartService: CartService,
    private productService: ProductService,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.cartService.openCart.subscribe(toggle => this.isOpen = toggle);
  }

  ngOnInit() {
    this.companiesSearvice.getAll().subscribe();
    this.currentCompaniesSubscription = this.companiesSearvice.companies.subscribe(companies => {
      this.currentCompanies = companies;
    });
    this.companiesSearvice.currentCompany.subscribe(company => this.selectedCompany = company);
    this.productService.currentProduct.subscribe(product => this.selectedProduct = product);
  }

  toggle() {
    this.cartService.cartToggle(!this.isOpen);
  }

  selectCompany(company) {
    this.companiesSearvice.changeCompany(company);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }

  addProduct() {
    this.productService.changeProduct(null);
    this.productService.productToggle(!this.isProductOpen);
  }
}
