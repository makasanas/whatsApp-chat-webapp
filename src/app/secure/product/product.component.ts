import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from './product.service';
import { ActivatedRoute } from "@angular/router";
import { SecureService } from "./../secure.service";
import { country } from "./country";

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

	public itemLevelIssues = {
		count: 0,
		limit: 0,
		offset: 0,
		pageSize: 0
	}

	public productInfo = {
		totalProduct: 0,
		submitted: 0,
		approved: 0,
		Penning: 0,
		Disapproved: 0
	}
	public pageOffset = this.page.offset;
	public allSelected: boolean = false;
	public defaultValue;
	public commonOption;
	public country;
	public commonPopup = false;
	public user;
	public selectedProduct;
	public disapprovedPopup = false;
	public disapprovedProduct:any = {};
	public disapprovedProductLoading = false;



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

		this.commonOption = this.formBuilder.group({
			identifierExists: [false, Validators.required],
			isBundle: [false, Validators.required],
			targetCountry: ['', Validators.required],
			channel: ['online', Validators.required],
			adult: [false, Validators.required],
			ageGroup: ['adult', Validators.required],
			availability: ['in stock', Validators.required],
			condition: ['new', Validators.required],
			gender: ['male', Validators.required],
			googleProductCategory: ['1604', Validators.required],
			currency: ['', Validators.required],
			contentLanguage: ['', Validators.required]
		});


		this.defaultValue = this.formBuilder.group({
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
		this.country = country;

		this.query = this.serialize(this.filters.value);
		this.getProduct(this.page, this.query);

		this.collections = this.secureService.getCollection();
		if (this.collections.length == 0) {
			this.secureService.collections.subscribe((data) => {
				this.collections = data;
			});
		}

		this.user = this.secureService.getUser();
		this.commonOption.controls['targetCountry'].setValue(this.user.country_code);
		this.commonOption.controls['currency'].setValue(this.user.currency);
		this.commonOption.controls['contentLanguage'].setValue(this.user.language);
		// this.getCredit();

		console.log(this.user);

		this.accountStatuses();
	}

	accountStatuses() {
		let data = {
			"entries": [
				{
					"batchId": 0,
					"merchantId": this.user.merchantId,
					"method": "get",
					"accountId": this.user.merchantId,
					"destinations": ["SurfacesAcrossGoogle"]
				}
			]
		}

		this.productService.accountStatuses(data).subscribe((res) => {
			if(res.data.entries[0].accountStatus.products){
				let active = parseInt(res.data.entries[0].accountStatus.products[0].statistics.active);
				let disapproved = parseInt(res.data.entries[0].accountStatus.products[0].statistics.disapproved);
				let pending = parseInt(res.data.entries[0].accountStatus.products[0].statistics.pending);
				this.productInfo['submitted'] = active + disapproved + pending;
				this.productInfo['active'] = active;
				this.productInfo['disapproved'] = disapproved;
				this.productInfo['pending'] = pending;
			}
		}, err => {
			console.log(err);
		});
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
			this.productInfo.totalProduct = res.data.count;
			this.getProductStatus(this.user, this.productlist);

		}, err => {
		});
	}

	getProductStatus(user, products) {
		console.log(user, products);

		let data = {
			entries: []
		};

		products.forEach((product, index) => {
			let batch = {
				"method": "get",
				"batchId": index,
				"merchantId": user.merchantId,
				"productId": "online:" + user.language + ":" + user.country_code + ":" + product.id
			};

			data.entries.push(batch);
		});

		this.productService.productStatuses(data).subscribe((res) => {
			console.log(res.data);
			this.productlist.forEach((product, index) => {
				product['status'] = res.data.entries[index];
			});
			console.log(this.productlist);
		}, err => {
			console.log(err);
		});
	}


	// getCredit() {
	// 	this.productService.getCredit().subscribe((res) => {
	// 		//this.credit = res.data.credit;
	// 	}, err => {
	// 	});
	// }

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
				if (product.status.errors) {
					product['isSelected'] = true;
					this.selected.push(product);
				}
			})
		} else {
			this.allSelected = false;
			this.productlist.forEach(product => {
				if (product.status.errors) {
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
		this.commonPopup = true;
	}


	generate(item) {
		this.selected = [item];
		this.commonPopup = true;
	}

	submitForm() {
		this.generateData(this.selected);
		this.commonPopup = false;
	}


	generateData(products) {
		let data = {
			entries: []
		};

		products.forEach((product, index) => {
			let commonOption = this.commonOption.value

			let additionalImageLinks = []
			if (product.images) {
				product.images.forEach((image) => {
					additionalImageLinks.push(image.src)
				})
			}



			let singleProduct = {
				"kind": "content#product",
				"offerId": product.id,
				"contentLanguage": commonOption.contentLanguage,
				"isBundle": commonOption.isBundle,
				"title": product.title,
				"description": product.body_html.substring(0, 4500),
				"link": "https://" + this.user.domain + '/products/' + product.handle,
				"mobileLink": "https://" + this.user.domain + '/products/' + product.handle,
				"imageLink": product.image.src,
				"additionalImageLinks": additionalImageLinks,
				"targetCountry": commonOption.targetCountry,
				"channel": commonOption.channel,
				"expirationDate": new Date(new Date().getTime() + (365 * 24 * 60 * 60 * 1000)).toISOString().split('.')[0] + "Z",
				"adult": commonOption.adult,
				"ageGroup": commonOption.ageGroup,
				"availability": commonOption.availability,
				// "brand":"",//Need to ask sotre owner
				// "color":"",//Need to ask sotre owner
				"condition": commonOption.condition,
				"gender": commonOption.gender,
				"googleProductCategory": commonOption.googleProductCategory,
				// "itemGroupId": "", // "google_tee" or "something commen use in every where". Also I suggest add title 
				// "material":"", // Need to ask manuly  
				// "mpn":"", //Need to ask manuly 
				// "pattern":"", // Need to ask manuly 
				// "salePriceEffectiveDate":"", //Date range during which the item is on sale
				// "sellOnGoogleQuantity":"", //how many quantity is avalible to sell in google 
				// "destinations": [
				//     {
				//         "destinationName": "Shopping Ads",
				//         "intentionß": "default"
				// 	},
				// 	{
				//         "destinationName": "Shopping Actions",
				//         "intention": "default"
				// 	},
				// 	{
				//         "destinationName": "Display Ads",
				//         "intention": "default"
				// 	},
				// 	{
				//         "destinationName": "Surfaces across Google",
				//         "intention": "default"
				//     }
				// ]
			}

			let price = {}
			let salePrice = {}

			if (product.variants[0].compare_at_price) {
				price = {
					"value": product.variants[0].compare_at_price,
					"currency": commonOption.currency
				}

				salePrice = {
					"value": product.variants[0].price,
					"currency": commonOption.currency
				}

				singleProduct['salePrice'] = salePrice;
			} else {
				price = {
					"value": product.variants[0].price,
					"currency": commonOption.currency
				}
			}

			singleProduct['price'] = price;

			if (product.variants[0].barcode) {
				singleProduct['gtin'] = product.variants[0].barcode;
				singleProduct['identifierExists'] = 'true'
			} else {
				singleProduct['identifierExists'] = 'false'
			}


			let batch = {
				"method": "insert",
				"batchId": index,
				"merchantId": this.user.merchantId,
				"product": singleProduct
			}

			data.entries.push(batch);
		});

		console.log(data);
		this.submitProduct(data);
	}

	submitProduct(entries) {
		this.loading = true;
		this.productService.create(entries).subscribe((res) => {
			this.loading = false;
			this.selected = [];
			console.log(res.data);
		}, err => {
			console.log(err);
		});
	}

	fixErrors(item) {
		this.disapprovedPopup = true;
		this.disapprovedProductLoading = true;
		this.productService.singleProductStatuses(item.status.productStatus.productId).subscribe((res) => {
			this.disapprovedProduct = res.data;
			this.disapprovedProductLoading = false;
			this.itemLevelIssues.count = this.disapprovedProduct.itemLevelIssues.length;
			this.itemLevelIssues.limit = this.disapprovedProduct.itemLevelIssues.length;
			console.log(res.data);
		}, err => {
			console.log(err);
		});
	}

	closedisapprovedPopup(){
		this.disapprovedPopup = false;
	}

	closeCommonPopup() {
		this.commonPopup = false;
	}
}