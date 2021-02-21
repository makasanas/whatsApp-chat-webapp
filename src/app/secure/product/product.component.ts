import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
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
	public previewColor: boolean = false;
	public availabalechat = [
		{
			name: '',
			icon: 'whatsapp',
			label: 'For example: 1507854875',
			added: false,
			tooltip: 'Whatsapp',
			id: '01',
			setting: false,
			fill: '#1BD741',
		},
		{
			name: '',
			icon: 'instagram',
			label: 'For example: InstagramUsername',
			added: false,
			tooltip: 'Instagram',
			id: '02',
			setting: false,
			fill: '',
		},
		{
			name: '',
			icon: 'sms',
			label: 'For example: +1507854875',
			added: false,
			tooltip: 'SMS',
			id: '03',
			setting: false,
			fill: '#3e82b0'

		},
	];
	public msgIcons = ["icon1", "icon2", "icon3", "icon4"]
	public colors = [
		{
			colorName: 'Purple',
			colorValue: ' #A886CD',
			id: 0
		},
		{
			colorName: 'Green',
			colorValue: ' #86CD91',
			id: 1
		},
		{
			colorName: 'Blue',
			colorValue: ' #4F6ACA',
			id: 2
		},
		{
			colorNameme: 'Red',
			colorValue: ' #FF6060',
			id: 3
		},
		{
			colorName: 'Black',
			colorValue: ' #000',
			id: 4
		},
		{
			colorName: 'Yellow',
			colorValue: ' #EEF075',
			id: 5
		},
		{
			colorName: 'Pink',
			colorValue: ' #FF95EE',
			id: 6
		}

	];
	public animations = [
		{
			name: 'Normal',
			value: ''
		},
		{
			name: 'Pulse',
			value: 'animate__pulse'
		},
		{
			name: 'Bounce',
			value: 'animate__bounce'
		},
		{
			name: 'Waggle',
			value: 'animate__wobble'
		},
		{
			name: 'Spin',
			value: 'animate__rotateIn'
		},
		{
			name: 'Fade',
			value: 'animate__flash'
		},
		{
			name: 'HeartBeat',
			value: 'animate__heartBeat'
		},
	]
	public profileData: Object;
	public url: String;
	public chatPositions: any = {
		bottom: 'initial',
		left: 'initial',
		right: 'initial'
	}

	public isListActive: boolean = true;

	constructor(private Formbuild: FormBuilder, private productService: ProductService) {
		this.signupForm = this.Formbuild.group({
			position: new FormControl('left'),
			chatyName: 'Widget-01',
			left: '10',
			right: '10',
			bottom: '10',
			colorName: 'Blue',
			colorValue: '',
			tooltipText: 'Contact us',
			tooltipTextcolor: '#000',
			tooltipBackgroundcolor: '#efefef',
			magIcon: new FormControl('icon1'),
			iconvalue: '',
			providers: this.Formbuild.array([
			]),
			animationName: 'animate__pulse',
			Previewpendingmsg: new FormControl(false),
			pendingNumber: '0',
			pendingNumberColor: '',
			pendingMsgcolor: '',
			iconView: 'vertical',
			defaultState: 'click',
			secondBtn: new FormControl(false),
			PercentageBtn: new FormControl(false),
			size: '10'
		});
	}

	ngOnInit() {
		this.getData();
	}
	setPostions() {
		let position = this.signupForm.controls.position.value;
		if (position == 'left') {
			this.chatPositions.right = 'initial';
			this.chatPositions.left = this.signupForm.controls.left.value + "px"
			this.chatPositions.bottom = this.signupForm.controls.bottom.value + "px"
		} else {
			this.chatPositions.left = 'initial';
			this.chatPositions.right = this.signupForm.controls.right.value + "px"
			this.chatPositions.bottom = this.signupForm.controls.bottom.value + "px"
		}
	}

	providers() {
		return this.Formbuild.group({
			'name': ['', Validators.required],
			'label': '',
			'tooltip': '',
			'id': '',
			'icon': '',
			'desktop': new FormControl(false),
			'mobile': new FormControl(false),
			'fill': 'false',

		});
	}

	changemsgIcon(msg) {
		this.signupForm.controls.magIcon.setValue(msg.magIcon);
	};
	changeColor(color) {
		this.signupForm.patchValue(color);
	};

	changeListStatus() {
		console.log(this.signupForm.controls.defaultState.value);
		if (this.signupForm.controls.defaultState.value == 'click') {
			this.isListActive = !this.isListActive;
		}
	}


	addProvider(chatData) {

		if (!chatData['added']) {
			chatData['added'] = true;
			const control = <FormArray>this.signupForm.controls['providers'];
			control.push(this.providers());
			this.signupForm.controls.providers['controls'][this.signupForm.value.providers.length - 1].patchValue(chatData);
			let found = this.availabalechat.find(e => e.icon == chatData.icon);
			found['added'] = found ? true : false;

		} else {
		}

	}
	removeProvider(i, name) {
		let found = this.availabalechat.find(e => e.icon == name);
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

	showPreview() {
		this.previewColor = !this.previewColor;
	}
	pendingMsg() {
		this.signupForm.controls.Previewpendingmsg.setValue(!this.signupForm.controls.Previewpendingmsg.value);
	}

	onSubmit() {
		this.productService.addSettings(this.signupForm.value).subscribe((res) => {
		}, err => {
		});
	}
	getData() {
		this.productService.getSetting().subscribe((res) => {
			res.data.configurations.providers.forEach(element => {
				this.addProvider(element)

			});
			this.signupForm.patchValue(res.data.configurations);
			this.setPostions();
		}, err => {
			// console.log(err);
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

}