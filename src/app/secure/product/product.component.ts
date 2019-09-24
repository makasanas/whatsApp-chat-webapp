import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from './product.service';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

	public productlist: any[];
	public filters: FormGroup;
	public collections = [];
	public loading = false;
	public query = '';
	public searchLoading : false;

	public columns = [
		{ prop: 'title', name: 'Product Title', width: 450 },
		{ prop: 'id', name: 'Product Id' },
		{ prop: 'product_type', name: 'Product Type' },
		{ prop: 'variants.length', name: 'Variants' },
	];

	public page = {
		count: 0,
		limit: 0,
		offset: 0,
		pageSize: 0
	}

	constructor(
		private productService: ProductService,
		private router: Router,
		private formBuilder: FormBuilder,
	) {
		this.page.offset = 0;
		this.page.limit = 10;
	
		this.filters = this.formBuilder.group({
			title: [''],
			collection_id: [''],
			created_at_min: [''],
			created_at_max: [''],
			published_status: [''],
		});

	}

	ngOnInit() {
		this.getProduct(this.page , this.query);
		this.getCollection();
	}

	getProduct(page, query) {
		this.loading = true;
		this.productService.getProduct(query, page).subscribe((res) => {
			this.loading = false;
			this.page.count = res.data.count;
			this.productlist = res.data.products;
			this.page.offset = page.offset;
		}, err => {
		});
	}


	generateDiscription(item) {
		let dis = item.body_html.replace(/<[^>]*>/g, '');
		var paragraphs = dis.replace(/\n\r/g, "\n").replace(/\r/g, "\n").split(/\n{2,}/g);
		var lines = dis.split(/[\r\n]+/);

		paragraphs = lines.map(function (element) {
			if (!~[".", "!", "?", ";"].indexOf(element[element.length - 1])) element += ".";
			return element.trim();
		});

		var description = paragraphs.join(" ");
		let data = {
			input: description,
			product: item
		}

		if (data.input.length > 200) {
			this.productService.getDescription(data).subscribe((res) => {
			}, err => {
				console.log(err);
			});
		} else {
			if (data.input == '.') {
			} else {
			}
		}
	}

	getCollection() {
		if (this.collections.length == 0) {
			this.productService.getCollection().subscribe((res) => {
				this.collections = res.data.collections;
				console.log(this.collections);
			}, err => {
			});
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

		this.query = this.serialize(this.filters.value);

		this.page = {
			count: 0,
			limit: 10,
			offset: 0,
			pageSize: 0
		
		}
		this.getProduct(this.page, this.query);
	}

	serialize = function (obj) {
		var str = [];
		for (var p in obj)
			if (obj.hasOwnProperty(p) && obj[p] != '') {
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			}
		return str.join("&");
	}

}
