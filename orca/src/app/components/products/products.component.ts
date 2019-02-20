import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../_services/product.service";
import {CompanyService} from "../../_services/company.service";
import {Company, Product} from "../../_models";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public selectedCompany: Company;
  public selectedProduct: Product;

  @ViewChild('productModal') proModal;

  constructor(private companiesSearvice: CompanyService, private productService: ProductService , private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.companiesSearvice.currentCompany.subscribe(company => this.selectedCompany = company);
    this.productService.currentProduct.subscribe(product => this.selectedProduct = product);
  }

  showProductModal() {
    this.proModal.show();
  }

  closeProductModal() {
    this.proModal.hide();
  }
  onClosed(event: any) {
    console.log(event);
  }

  onClose(event: any) {
    console.log(event);
  }

  onOpened(event: any) {
    console.log(event);
  }

  onOpen(event: any) {
    console.log(this.selectedProduct._id + ' from products');
  }

}
