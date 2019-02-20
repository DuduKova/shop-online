import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthenticationService, ProductService} from "../../_services";
import {User} from "../../_models";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product;
  currentUser: User;
  @Output() productModalShow = new EventEmitter();
  isOpen = false;

  constructor(private productService: ProductService,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
  }

  ngOnInit() {
  }

  show(product) {
    this.productService.changeProduct(product);
    this.productModalShow.emit();
  }

  editProduct(product) {
    this.productService.changeProduct(product);
    this.productService.productToggle(!this.isOpen);
  }
}
