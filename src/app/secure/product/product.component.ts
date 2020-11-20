import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from './product.service';
import { SecureService } from "./../secure.service";
import { CommonService } from 'src/app/common/common.service';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';


@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
	formdata : FormGroup;
	more : boolean = false;
	insta : boolean = false;
	setting : boolean = false;
	color : any;
    movies = [
		'WhatsUp',
		
	  ];

	  drop(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
	  }
	
	constructor(private Formbuild: FormBuilder) {
		this.formdata= this.Formbuild.group({
			color: ':#1BD741'
		  })
	}


	ngOnInit() {
		console.log(this.formdata.value)

	}

	
			
}