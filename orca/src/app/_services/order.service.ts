import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Cart, Order, User} from "../_models";
import {CartService} from "./cart.service";
import {AuthenticationService} from "./authentication.service";

@Injectable({providedIn: 'root'})
export class OrderService {
  private orderSubject: BehaviorSubject<Order[]>;
  public order: Observable<Order[]>;
  private currentUser: User;
  private currentCart: Cart;

  constructor(private http: HttpClient, private cartService: CartService, private uthenticationService: AuthenticationService) {
    this.orderSubject = new BehaviorSubject<Order[]>(JSON.parse(localStorage.getItem('order')));
    this.order = this.orderSubject.asObservable();
    this.uthenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.cartService.currentCart.subscribe(x => this.currentCart = x);
  }

  public get orderValue(): Order[] {
    return this.orderSubject.value;
  }

  addOrder(order) {
    return this.http.post<Order[]>('http://localhost:3000/orders/add', order)
      .pipe(map(order => {
        localStorage.setItem('order', JSON.stringify(order));
        this.orderSubject.next(order);
        return order;
      }));
  }
}
