import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from './product.service';
import { SecureService } from "./../secure.service";

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

	constructor(
		private productService: ProductService,
		private formBuilder: FormBuilder,
		private secureService: SecureService
	) {

		this.page.limit = localStorage.getItem('pageLimit') ? parseInt(localStorage.getItem('pageLimit')) : 10;

		this.filters = this.formBuilder.group({
			title: [''],
			collection_id: [''],
			created_at_min: [''],
			created_at_max: [''],
			published_status: [''],
			fields: ['id,image,title,body_html,handle'],
		});
	}

	pageLimit() {
		localStorage.setItem('pageLimit', this.page.limit.toString());
		this.query = this.serialize(this.filters.value) + "&newquery=true&limit=" + this.page.limit;
		this.getProductByLink(this.query);
	}

	ngOnInit() {
		this.secureService.sendRoute(this.secureService.getUser());
		this.shopUrl = localStorage.getItem('shopUrl')
		
		this.user = this.secureService.getUser();

		this.query = this.serialize(this.filters.value) + "&newquery=true&limit=" + this.page.limit;
		this.getProductByLink(this.query);
	}

	getProductByLink(link) {
		console.log(link);
		this.loading = true;
		this.productService.getProductByLink(link).subscribe((res) => {
			console.log(res.data);
			this.pagination = res.data.pagination ? res.data.pagination : {};
			this.loading = false;
			this.page.count = res.data.count || res.data.count == 0 ? res.data.count : this.page.count;
			this.productlist = res.data.products;
			this.selected = [];
			this.allSelected = false;
		}, err => {
			console.log(err);
		});
	}


	getRowClass = (row) => {
		if (row.added || row.queue) {
			return "disable";

		} else {
			return;
		}
	}

	filterProduct() {
		let created_at_min = this.filters.value.created_at_min;
		let created_at_max = this.filters.value.created_at_max;

		if (created_at_min) {
			created_at_min = new Date(created_at_min.year, created_at_min.month, created_at_min.day).toISOString();
		}

		if (created_at_max) {
			created_at_max = new Date(created_at_max.year, created_at_max.month, created_at_max.day).toISOString();
		}

		this.filters.value.created_at_min = created_at_min;
		this.filters.value.created_at_max = created_at_max;

		this.query = this.serialize(this.filters.value) + "&newquery=true&limit=" + this.page.limit;
		this.getProductByLink(this.query);
	}

	serialize = function (obj) {
		var str = [];
		for (var p in obj)
			if (obj.hasOwnProperty(p) && obj[p] != '') {
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			}
		return str.join("&");
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

}