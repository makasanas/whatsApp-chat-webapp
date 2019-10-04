import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableColumn, ColumnMode } from '@swimlane/ngx-datatable';
import { ProductService } from './product.service';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from "@angular/router";
import { SecureService } from "./../secure.service"

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
	public selected = [];
	public columns = [
		{
			prop: 'selected',
			name: '',
			sortable: false,
			canAutoResize: false,
			draggable: false,
			resizable: false,
			headerCheckboxable: true,
			checkboxable: true,
			width: 30
		},
		{ prop: 'title', name: 'Product Title', width: 450 },
		{ prop: 'id', name: 'Product Id' },
		{ prop: 'product_type', name: 'Product Type' },
		{ prop: 'variants.length', name: 'Variants' },
	];
	public exceedLimit: boolean = false;
	public page = {
		count: 0,
		limit: 0,
		offset: 0,
		pageSize: 0
	}

	public pageOffset = this.page.offset;
	public allSelected: boolean = false;

	constructor(
		private productService: ProductService,
		private router: Router,
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private secureService: SecureService
	) {

		this.route.params.subscribe(params => {
			this.page.offset = parseInt(params.id) - 1;
			this.page.limit = localStorage.getItem('pageLimit') ? parseInt(localStorage.getItem('pageLimit')) : 10;
		});

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
		this.getProduct(this.page, this.query);

		localStorage.setItem('pageLimit', this.page.limit.toString());
	}

	ngOnInit() {
		this.query = this.serialize(this.filters.value);
		this.getProduct(this.page, this.query);

		this.collections = this.secureService.getCollection();
		if(this.collections.length == 0){
			this.secureService.collections.subscribe((data) => {
				this.collections = data;
			});
		}
	}



	getProduct(page, query) {
		this.loading = true;
		this.productService.getProduct(query, page).subscribe((res) => {
			this.loading = false;
			this.page.count = res.data.count;
			this.productlist = res.data.products;
			this.page.offset = page.offset;
			this.pageOffset = this.page.offset;
			this.selected = [];
			this.allSelected = false;
		}, err => {
		});
	}

	generateDiscription(item) {
		// if (this.credit > 0) {
		// 	// wreite logic here
		// } else {
		// 	this.exceedLimit = true;
		// }
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

	close() {
		this.exceedLimit = false;
	}

	selectAll(event) {
		this.selected = [];
		if (event.currentTarget.checked) {
			this.allSelected = true;
			this.productlist.forEach(product => {
				if (!product.added && !product.queue) {
					product['isSelected'] = true;
					this.selected.push(product);
				}
			})
		} else {
			this.allSelected = false;
			this.productlist.forEach(product => {
				if (!product.added && !product.queue) {
					product['isSelected'] = false;
					this.selected = [];
				}
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

	addInQueue() {
		// if (this.credit >= this.selected.length) {
		// 	// write add Quere logic here
		// } else {
		// 	this.exceedLimit = true;
		// }
	}
}