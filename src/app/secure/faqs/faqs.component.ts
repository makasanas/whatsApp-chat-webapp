import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FaqsService } from './faqs.service'


@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})

export class FaqsComponent implements OnInit {

  public faq = [false, false, false, false, false, false, false, false, false, false, false, false];

  public faqs= [
    {
      title:"Is this App has trial days to access?",
      ans: "Yes, This app provides you to give free 5 credit to generate meta description.",
      open:false
    },
    {
      title:"How to buy Credits?",
      ans: "You can easily buy credits from pricing as per your requirements.",
      open:false
    },
    {
      title:"How to generate meta description for set?",
      ans: "For generating meta description you just need to click on generate button, The AI will generate it very shortly.",
      open:false
    },
    {
      title:"Can I generate meta description for multiple products at the same time?",
      ans: "Yes, you can select multiple product and hit the add in queue button it will generate meta description for the selected products.",
      open:false
    },
    {
      title:" How much time it takes to generate meta description for multiple products?",
      ans: "Generally the AI should takes approx 1s to generate the meta for single products, So it will depends on how much products you have selected.",
      open:false
    },
    {
      title:"How do I know my current credit and the remaining products to generate meta description?",
      ans: "You can see the current status of your credit and remaining products in the product list menu of an app.",
      open:false
    },
    {
      title:"How do I find specific products?",
      ans: "There are many filters available to find products like collection wise, Date wise and also you can directly find it by its name.",
      open:false
    },
    {
      title:"What is the charge for installing this app?",
      ans: "The installation of this app is completely free and it will also give you 5 credit on installation for experience the future.",
      open:false
    },
    {
      title:"Do you offer live chat support?",
      ans: "No, We do not have offer live chat support but our support team will be solve your any query within just 24 hours.",
      open:false
    },
    {
      title:"How do I remove the app?",
      ans: "You can uninstall the app from your shoplift store admin just by clicking on trash icon on the app list page.",
      open:false
    },

    {
      title:"how can I contact the support?",
      ans: "You can easily contact with us on the provided contact email 24x7 and the support team will reach you ASAP.",
      open:false
    }
  ];
  public contactForm;
  public messageStatus;

  constructor(private formBuilder: FormBuilder, private faqsService: FaqsService) { 
    this.contactForm = this.formBuilder.group({
			userId: [''],
			email: [''],
			messageType: ['', Validators.required],
      message: ['', Validators.required],
      shopUrl:[''],
      messageFrom:['']
		});
  }

  ngOnInit() {
    this.faqsService.getUser().subscribe((res) => {
      this.contactForm.controls['email'].setValue(res.data.email);
      this.contactForm.controls['userId'].setValue(res.data._id);
      this.contactForm.controls['shopUrl'].setValue(res.data.shopUrl);
      this.contactForm.controls['messageFrom'].setValue(window.location.origin+" -  Faqs contacts");
    }, err => {
    });
  }

  changeActive(i) {
    this.faqs[i].open = !this.faqs[i].open;
  }


  sendMessage(){
    if (!this.contactForm.invalid) {
      this.faqsService.sendMessage(this.contactForm.value).subscribe((res) => {
        this.messageStatus = 'Thank you, We got your message.'
      }, err => {
        this.messageStatus = 'Something happen wrong please try again.';
      });
    }
    else {
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key).markAsDirty();
      });
    }
  }
}