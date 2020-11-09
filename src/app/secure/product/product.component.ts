import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from './product.service';
import { SecureService } from "./../secure.service";
import { CommonService } from 'src/app/common/common.service';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {

	
	constructor() {}


	ngOnInit() {
	}

	
			
}