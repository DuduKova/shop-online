import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CartItem, Product} from "../../_models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../_services";
import {CartService} from "../../_services";

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnInit , OnChanges{
@Output() closePM = new EventEmitter();
@Input() selectedProduct: Product;
  productForm: FormGroup;
  cartItem: CartItem;
  submitted = false;
  private _changes: SimpleChanges;
  constructor(private formBuilder: FormBuilder ,
              private productService: ProductService ,
              private cartService: CartService) {
    this.productForm = this.formBuilder.group({
      'productId': ['', [Validators.required]],
      'quantity': ['', [Validators.required,Validators.minLength(1),
        Validators.max(10),
        Validators.pattern('^[0-9]*$')]],
      'totalPrice': ['', [Validators.required]]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this._changes = changes;
    if(this.selectedProduct) {
      this.productForm.setValue({'productId': this.selectedProduct._id, 'totalPrice': this.selectedProduct.price , 'quantity': 1});
      this.productForm.touched;
    } else {
      this.productForm.reset();
    }

  }
  ngOnInit() {
    this.productService.currentProduct.subscribe(product => this.selectedProduct = product);
  }

  get f() { return this.productForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.productForm.invalid) {
      return;
    }

    this.cartService.addItem(this.productForm.value);
    this.hide();
  }

  hide() {
    this.closePM.emit()
  }
}

