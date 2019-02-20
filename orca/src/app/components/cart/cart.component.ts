import {Component, OnInit} from '@angular/core';
import {CartService} from "../../_services";
import {Cart, Company, User} from "../../_models";
import {AuthenticationService, OrderService} from "../../_services";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import {CompanyService} from "../../_services/company.service";

@Component({
  selector: 'app-cart',
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '100%',
        opacity: 1,
        display: 'block',
      })),
      state('closed', style({
        height: '100px',
        opacity: 0,
        display: 'none',
      })),
      transition('open => closed', [
        animate('700ms ease-in', style({transform: 'translateX(-100%)'}))
      ]),
    ]),
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  currentCart: Cart;
  currentUser: User;
  selectedCompany: Company;
  isOpen = false;
  totalPrice = 0;

  constructor(private cartService: CartService,
              private authenticationService: AuthenticationService,
              private companiesSearvice : CompanyService,
              private orderService: OrderService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.companiesSearvice.currentCompany.subscribe(company => this.selectedCompany = company);
    this.cartService.openCart.subscribe(toggle => this.isOpen = toggle);
    this.cartService.currentCart.subscribe(currentCart => this.currentCart = currentCart);
    this.cartService.totalPrice.subscribe(totalPrice => this.totalPrice = totalPrice);
  }

  ngOnInit() {
    this.cartService.getOne(this.currentUser._id).subscribe();
    this.getTotalPrice(this.currentCart.items);
  }

  toggle() {
    this.cartService.cartToggle(!this.isOpen);
  }

  deleteItem(pid) {
    this.cartService.deleteItem(pid);
  }

  getTotalPrice(items) {
    this.cartService.getTotalPrice(items);
  }
}

