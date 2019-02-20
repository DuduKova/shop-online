import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Company, Product} from "../_models";

@Injectable({providedIn: 'root'})
export class CompanyService {
  private companiesSubject: BehaviorSubject<Company[]>;
  public companies: Observable<Company[]>;

  private selectedCompanySubject: BehaviorSubject<Company>;
  public currentCompany: Observable<Company>;

  private allProductsSubject: BehaviorSubject<Product[]>;
  public allProducts: Observable<Product[]>;

  products = [];

  constructor(private http: HttpClient) {
    this.companiesSubject = new BehaviorSubject<Company[]>(JSON.parse(localStorage.getItem('companies')));
    this.companies = this.companiesSubject.asObservable();
    this.selectedCompanySubject = new BehaviorSubject(null);
    this.currentCompany = this.selectedCompanySubject.asObservable();
    this.allProductsSubject = new BehaviorSubject<Product[]>(JSON.parse(localStorage.getItem('allProducts')));
    this.allProducts = this.allProductsSubject.asObservable();
  }

  public get companiesValue(): Company[] {
    return this.companiesSubject.value;
  }

  public get selectedCompanyValue(): Company {
    return this.selectedCompanySubject.value;
  }

  public get productsValue(): Product[] {
    return this.allProductsSubject.value;
  }

  getAll() {
    this.products = [];
    return this.http.get<Company[]>('http://localhost:3000/companies')
      .pipe(map((companies) => {
        localStorage.setItem('companies', JSON.stringify(companies));
        this.companiesSubject.next(companies);
        companies.map((company , index) => {
          this.products.push(companies[index].products);
          this.changeAllProducts(this.products);
        })
      }));
  }

  changeCompany(company) {
    this.selectedCompanySubject.next(company);
  }

  changeAllProducts(products) {
    const merged = [].concat.apply([], products);
    this.allProductsSubject.next(merged);
  }
}

