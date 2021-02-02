import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl} from '@angular/forms';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.scss']
})
export class ProductNewComponent implements OnInit {
  signupForm: FormGroup;
  constructor(private Formbuild: FormBuilder) {
    this.signupForm = this.Formbuild.group({
			
      position: this.Formbuild.group({
        right: new FormControl(false),
        left: new FormControl(false)
      }),
      'provider': this.Formbuild.array([
      ])
    });
    
   }
   provider() {
		return this.Formbuild.group({
			'name': '',
			'label': '',
      'tooltip': '',
      'id': '',
      'icon': '',
      'desktop': '',
      'mobile': ''
		})
  }
  
  addProvider(name) {
    console.log(name);
    let found = this.availabalechat.find(e => e.name == name);
    if(!found['added']){
      found['added'] = true;
      const control = <FormArray>this.signupForm.controls['provider'];
      control.push(this.provider());
      this.signupForm.controls.provider['controls'][this.signupForm.value.provider.length - 1].patchValue(found);
      console.log(this.signupForm.value.provider);
    }else{
      // const control = <FormArray>this.signupForm.controls['provider'];
      // control.controls.splice(i, 1);
      // control.value.splice(i, 1); 
    }

    // console.log(this.availabalechat.find(item => item.name === name))
    // var found = this.availabalechat.find(item => item.name === name);
    // if(!found){
    //   this.availabalechat.push(this.availabalechat[name])
    //   console.log(found)
    // }
  }
  removeProvider(i,name) {
    
    let found = this.availabalechat.find(e => e.name == name);
    console.log(found);
    found['added'] = false;
		console.log("removed called")
		const control = <FormArray>this.signupForm.controls['provider'];
		control.controls.splice(i, 3);
		control.value.splice(i, 3);
		
	}

  availabalechat = [
    {
      name: 'Whatesapp',
      icon: 'https://img.icons8.com/ios/96/000000/whatsapp--v3.png',
      label: 'For example: 1507854875',
      added:false,
      'tooltip': 'Whatsapp',
      'id': '',
      desktop: false,
      mobile: false
      
    },
    {
      name: 'Instagram',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png',
      label: 'For example: 1507854875',
      added:false,
      'tooltip': 'Instagram',
    },
    {
      name: 'SMS',
      icon: 'http://simpleicon.com/wp-content/uploads/sms.svg',
      label: 'For example: 1507854875',
      added:false,
      'tooltip': 'SMS',
    },
  ]
  addData = [
    {
      name: 'Whatsapp',
      label: 'For example: 1507854875',
    }
  ]
  
  ngOnInit() {
    
  }
  onSubmit(){
    console.log(this.signupForm.value)
  }

	url: any;
  onSelectFile(event: any) {
		if (event.target.files && event.target.files[0]) {
			var reader = new FileReader();

			reader.readAsDataURL(event.target.files[0]); // read file as data url

			reader.onload = (event: any) => { // called once readAsDataURL is completed
				this.url = event.target.result;
			}
		}
  }

  inActive:boolean = false;
  onChange(item){
       this.inActive = !this.inActive
  }
  toggleDropdown(item) {
    item.dropdownIsToggled = !item.dropdownIsToggled;
 }
 
}
