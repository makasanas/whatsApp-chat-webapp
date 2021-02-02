import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ProductService } from './product.service';
import { SecureService } from "./../secure.service";
import { CommonService } from 'src/app/common/common.service';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormControl } from '@angular/forms';


@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
	public signupForm: FormGroup;
	public isMobile: boolean = false;
	public availabalechat = [
		{
			name: 'Whatsapp',
			icon: 'whatsapp',
			label: 'For example: 1507854875',
			added: false,
			tooltip: 'Whatsapp',
			id: '',
			setting: false,
			fill: 'red'
		},
		{
			name: 'Instagram',
			icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png',
			label: 'For example: 1507854875',
			added: false,
			'tooltip': 'Instagram',
			setting: false
		},
		{
			name: 'SMS',
			icon: 'http://simpleicon.com/wp-content/uploads/sms.svg',
			label: 'For example: 1507854875',
			added: false,
			'tooltip': 'SMS',
			setting: false

		},
	];
	public addData = [
		{
			name: 'Whatsapp',
			label: 'For example: 1507854875',
		}
	];
	public profileData: Object;
	public url: String; 

	constructor(private Formbuild: FormBuilder, private productService: ProductService) {
		this.signupForm = this.Formbuild.group({
			position: new FormControl('right'),
			left: '10',
			right: '10',
			bottom: '15',
			providers: this.Formbuild.array([
			])
		});
	}
	
	ngOnInit() {
		this.getData();
	}
	providers() {
		return this.Formbuild.group({
			'name': '',
			'label': '',
			'tooltip': '',
			'id': '',
			'icon': '',
			'desktop': new FormControl(false),
			'mobile': new FormControl(false),
			'fill': 'red'
		});
	}
	addProvider(name) {
		let found = this.availabalechat.find(e => e.name == name);
		if (!found['added']) {
			found['added'] = true;
			const control = <FormArray>this.signupForm.controls['providers'];
			control.push(this.providers());
			this.signupForm.controls.providers['controls'][this.signupForm.value.providers.length - 1].patchValue(found);
		} else {
			// const control = <FormArray>this.signupForm.controls['providers'];
			// control.controls.splice(i, 1);
			// control.value.splice(i, 1); 
		}

	}
	removeProvider(i, name) {
		let found = this.availabalechat.find(e => e.name == name);
		found['added'] = false;
		const control = <FormArray>this.signupForm.controls['providers'];
		control.controls.splice(i, 1);
		control.value.splice(i, 1);
	}
	addSetting(i) {
		this.availabalechat[i].setting = !this.availabalechat[i].setting
	}
	changePreview() {
		this.isMobile = !this.isMobile;
	}
	onSubmit() {
		this.productService.addSettings(this.signupForm.value).subscribe((res) => {
		}, err => {
		});
	}
	getData() {
		this.productService.getSetting().subscribe((res) => {
			res.data.providers.forEach(element => {
				console.log(element.name)
				this.addProvider(element.name)
			});
			this.signupForm.patchValue(res.data);
		}, err => {
			console.log(err);
		})
	}
	onSelectFile(event: any) {
		if (event.target.files && event.target.files[0]) {
			var reader = new FileReader();

			reader.readAsDataURL(event.target.files[0]); // read file as data url

			reader.onload = (event: any) => { // called once readAsDataURL is completed
				this.url = event.target.result;
			}
		}
	}
	// formdata: FormGroup;
	// more: boolean = false;
	// insta: boolean = false;
	// setting: boolean = false;
	// close: boolean = false
	// cancel: boolean = false
	// color: any;
	// url: any;
	// flag: any;
	// signupForm: FormGroup;
	// customizedata: FormGroup;
	// pikcolor: any;
	// constructor(private Formbuild: FormBuilder) {
	// 	this.signupForm = this.Formbuild.group({
	// 		channels: this.Formbuild.group({
	// 			image: '',
	// 			text: '',
	// 			matlabel: '',
	// 			desktop: '',
	// 			mobile: '',
	// 			hovertext: ''
	// 		})
	// 	});
	// 	this.formdata = this.Formbuild.group({
	// 		color: ':#1BD741',
	// 		hoverwhatsapp: 'WhatsApp'
	// 	});
	// 	this.customizedata = this.Formbuild.group({
	// 		pikcolor: '',
	// 		left: '10',
	// 		right: '10',
	// 		side: '10',
	// 		bottom: '10'
	// 	});
	// 	this.flag = 0;
	// }
	// movies: any = [
	// 	{
	// 		name: 'WhatsUp',
	// 		image: "https://img.icons8.com/ios/96/000000/whatsapp--v3.png",
	// 		matlabel: 'For example: 1507854875',
	// 		help: '',
	// 		hovertext: 'Whatsapp',
	// 		id: 0
	// 	},
	// 	{
	// 		image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png",
	// 		matlabel: 'For example: 1507854875',
	// 		help: '',
	// 		hovertext: 'Instagram',
	// 		id: 1
	// 	}

	// ];
	// ccolor = [
	// 	{
	// 		name: 'Purple',
	// 		color: ' #A886CD',
	// 		id: 0
	// 	},
	// 	{
	// 		name: 'Green',
	// 		color: ' #86CD91',
	// 		id: 1
	// 	},
	// 	{
	// 		name: 'Blue',
	// 		color: ' #4F6ACA',
	// 		id: 2
	// 	},
	// 	{
	// 		name: 'Red',
	// 		color: ' #FF6060',
	// 		id: 3
	// 	},
	// 	{
	// 		name: 'Black',
	// 		color: ' #000',
	// 		id: 4
	// 	},
	// 	{
	// 		name: 'Yellow',
	// 		color: ' #EEF075',
	// 		id: 5
	// 	},
	// 	{
	// 		name: 'Pink',
	// 		color: ' #FF95EE',
	// 		id: 6
	// 	}

	// ];
	// xcolor = {
	// 	name: 'Purple',
	// 	color: ' #A886CD',
	// 	id: 0
	// }
	// public selectedColor = []
	// public selectedData = []
	// drop(event: CdkDragDrop<string[]>) {
	// 	moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
	// }



	// onSubmit(){
	// }

	// onColor(id, data) {
	// 	this.xcolor = id;
	// 	this.customizedata.value.pikcolor = undefined;
	// 	// this.selectedColor.push(this.ccolor[id])
	// }
	// onSelectFile(event: any) {
	// 	if (event.target.files && event.target.files[0]) {
	// 		var reader = new FileReader();

	// 		reader.readAsDataURL(event.target.files[0]); // read file as data url

	// 		reader.onload = (event: any) => { // called once readAsDataURL is completed
	// 			this.url = event.target.result;
	// 		}
	// 	}
	// }

	// onCLick(id) {
	// 	this.more = true

	// 	var found = this.selectedData.find(item => item.id === id);
	// 	if(!found){
	// 		this.selectedData.push(this.movies[id])
	// 	}


	// }

}