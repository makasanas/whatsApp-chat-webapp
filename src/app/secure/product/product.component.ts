import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from './product.service';
import { SecureService } from "./../secure.service";
import { CommonService } from 'src/app/common/common.service';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

	public filters: FormGroup;
	public page = {
		count: 0,
		limit: 0,
		offset: 0,
		pageSize: 0
	}
	public query;
	public collections = [];
	public user: any = {};
	public pagination: any = {};
	public loading = false;
	public productlist = [];
	public selected = [];
	public allSelected = false;
	public exceedLimit = false;
	public shopUrl;
	public products: any = [];
	public producttypes: any = [];
	public planError: boolean = false;
	public dataLoading: boolean = false;
	public pageType: string = 'products';

	constructor(
		private productService: ProductService,
		private formBuilder: FormBuilder,
		private secureService: SecureService,
		private commonService: CommonService,
		private router: Router
	) {
		this.page.limit = localStorage.getItem('pageLimit') ? parseInt(localStorage.getItem('pageLimit')) : 10;
		this.filters = this.formBuilder.group({
			type: [''],
			text: ['']
		});
	}


	ngOnInit() {
		this.secureService.sendRoute(this.secureService.getUser());
		this.shopUrl = localStorage.getItem('shopUrl')
		this.user = this.secureService.getUser();
		this.getProducts(this.page);
		this.getProductTypes();
		this.filters.controls.text.valueChanges.pipe(debounceTime(100)).subscribe(newValue => this.filter());
		this.filters.controls.type.valueChanges.pipe(debounceTime(100)).subscribe(newValue => this.filter());
	}

	getProducts(event) {
		this.dataLoading = true;
		this.productService.getProduct(event.limit, event.offset + 1).subscribe((res) => {
			console.log(res.data);
			this.products = res.data.result.product;
			this.page.count = res.data.result.count;
			this.page.count = res.data.result.count;
			this.dataLoading = false;
			this.page.offset = event.offset;
			console.log(this.products);
			if (this.products.length == 0) {
				this.newMessage("No Products Found");
			}
			if (!res.data.count.all) {
				this.router.navigate(['/settings'], { queryParams: { activeTab: 'sync' } });
			}
		}, err => {
			this.loading = false;
		});
	}


	getProductTypes() {
		this.productService.getProductTypes().subscribe((res) => {
			this.producttypes = res.data.product_type;
			this.filters.controls.type.setValue('all');
		}, err => {
			console.log(err);
		});
	}


	syncProduct() {
		this.productService.syncProducts().subscribe((res) => {
			console.log(res.data);
		}, err => {
			console.log(err);
			this.changeBoolean('planError', true);
		});
	}

	close() {
		this.exceedLimit = false;
	}

	selectAll(event) {
		this.selected = [];
		if (event) {
			this.allSelected = true;
			this.productlist.forEach(product => {
				product['isSelected'] = true;
				this.selected.push(product);
			})
		} else {
			this.allSelected = false;
			this.productlist.forEach(product => {
				product['isSelected'] = false;
				this.selected = [];

			})
		}
	}

	onSelect(event, selected, rowIndex) {
		if (event.currentTarget.checked) {
			this.productlist[rowIndex]['isSelected'] = true;
			this.selected.push(selected);

			var productlistCount = this.productlist.filter(function (product) {
				return !product.added && !product.queue;
			}).length;

			console.log(productlistCount, this.selected.length);
			if (productlistCount == this.selected.length) {
				this.allSelected = true;
			}

		} else {
			let index = this.selected.findIndex(item => { return item.id == selected.id; });
			this.productlist[rowIndex]['isSelected'] = false;
			this.selected.splice(index, 1);
			this.allSelected = false;
		}
		console.log(this.selected);
	}

	sync() {
		this.loading = true;
		this.productService.sync().subscribe((res) => {
			this.loading = false;
		}, err => {
			this.loading = false;
		});
	}

	serialize = function (obj) {
		var str = [];
		for (var p in obj)
			if (obj.hasOwnProperty(p) && obj[p] != '') {
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			}
		return str.join("&");
	}

	getByPage(event) {
		this.page = event;
		this.getProducts(event);
	}

	changeBoolean(variable: string, value: boolean) {
		this[variable] = value;
	}

	newMessage(msg: string) {
		this.commonService.changeNoDataMsg(msg);
	}

	filter(event) {
		this.dataLoading = true;
		this.productService.searchProduct({ limit: 10, page: 1 }, this.filters.value).subscribe((res) => {
			this.products = res.data.result.product;
			this.page.count = res.data.result.count;
			this.page.count = res.data.result.count;
			this.dataLoading = false;
			this.page.offset = 1;
			console.log(this.products);
			if (this.products.length == 0) {
				let msg = "No results found";
				this.newMessage(msg);
			}
			if (!res.data.count.all) {
				this.router.navigate(['/settings'], { queryParams: { activeTab: 'sync' } });
			}

		}, err => {
			console.log(err);
		});
	}


}