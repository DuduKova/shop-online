import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertService, AuthenticationService, OrderService, UserService} from "../../_services";
import {CartService} from "../../_services";
import {first} from "rxjs/operators";
import {Cart, User} from "../../_models";
import {DataService} from "../../_services/data.service";
import * as moment from "moment";

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OrderFormComponent implements OnInit {
  currentCart: Cart;
  currentUser: User;
  totalPrice: number;
  orderForm: FormGroup;
  loading = false;
  submitted = false;
  now = new Date();
  cities: string[];
  public min = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate());
  public max = new Date(this.now.getFullYear(), this.now.getMonth() + 5, this.now.getDate());


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService,
    private cartService: CartService,
    private orderService: OrderService,
    private dataService: DataService
  ) { if (this.authenticationService.currentUserValue) {
    this.router.navigate(['']);
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.cartService.totalPrice.subscribe(x => this.totalPrice = x);
    this.cartService.currentCart.subscribe(x => this.currentCart = x);
    this.dataService.cities.subscribe(x => this.cities = x);
  }}

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      city: ['', Validators.required],
      street: ['', Validators.required],
      dateToDeliver: ['', Validators.required],
      totalPrice: ['', Validators.required],
      cartId: ['', Validators.required],
      dateOfOrder: ['', Validators.required],
      creditCard4digit: ['', Validators.required],
    });

    if(this.currentCart) {
      this.orderForm.setValue(
        {'cartId': this.currentCart._id ,
          'city': 'Jerusalem',
          'street': this.currentUser.street,
          'totalPrice': this.totalPrice,
          'dateOfOrder': '',
          'dateToDeliver': '',
          'creditCard4digit': ''
        });
      this.orderForm.touched;
    } else {
      this.orderForm.reset();
    }
  }

  dateClass = (d: Date) => {
    const date = d.getDate();

    // Highlight the 1st and 20th day of each month.
    return (date === 1 || date === 20) ? 'example-custom-date-class' : undefined;
  };

  setCity(e) {
    this.orderForm.controls['city'].setValue(e.target.value);
  }


  // convenience getter for easy access to form fields
  get f() {
    return this.orderForm.controls;
  }

  onSubmit() {
    this.orderForm.controls['dateOfOrder'].setValue(new Date().toString());
    console.log(this.orderForm.value);
    this.submitted = true;

    if (this.orderForm.invalid) {
      return;
    }
    this.loading = true;
    console.log(this.orderForm.value);
    this.orderService.addOrder(this.orderForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Order successful', true);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

}
