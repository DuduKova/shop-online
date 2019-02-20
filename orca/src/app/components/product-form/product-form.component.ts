import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertService, AuthenticationService, ProductService} from "../../_services";
import {first} from "rxjs/operators";
import {Company, Product, User} from "../../_models";
import {CompanyService} from "../../_services/company.service";
import {FileUploader} from "ng2-file-upload";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  animations: [
    trigger('openClose', [
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
  encapsulation: ViewEncapsulation.None,
})
export class ProductFormComponent implements OnInit {
  currentUser: User;
  selectedProduct: Product;
  selectedCompany: Company;
  currentCompanies: Company[];
  productForm: FormGroup;
  loading = false;
  submitted = false;
  isOpen = false;
  URL = 'http://localhost:3000/api/upload';
  public uploader: FileUploader = new FileUploader({url: this.URL, itemAlias: 'photo'});

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private companiesSearvice: CompanyService,
    private productService: ProductService,
    private cd: ChangeDetectorRef
  ) { if (this.authenticationService.currentUserValue) {
    this.router.navigate(['']);
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.companiesSearvice.currentCompany.subscribe(company => this.selectedCompany = company);
    this.companiesSearvice.companies.subscribe(companies => this.currentCompanies = companies);
    this.productService.openProduct.subscribe(toggle => this.isOpen = toggle);
  }}

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
    };

    this.productService.currentProduct.subscribe(product => this.selectedProduct = product);
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
      company: ['', Validators.required],
    });
  }

  toggle() {
    this.productService.productToggle(!this.isOpen);
  }

  selectCompany() {
    this.companiesSearvice.changeCompany(this.productForm.controls['company'].value);
  }

  onFileChange(event) {
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.productForm.patchValue({
          file: file
        });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  get f() {
    return this.productForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.productForm.invalid) {
      return;
    }

    this.uploader.uploadAll();
    this.loading = true;
    if (this.selectedProduct) {
      this.productService.editProduct(this.productForm.value)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success('Product updated successful', true);
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          });
    } else {
      this.productService.addProduct(this.productForm.value)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success('Product successful', true);
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          });
    }
  }
}
