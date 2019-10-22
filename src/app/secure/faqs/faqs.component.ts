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
      title:"How can I link my account with Google Merchant Center?",
      ans: "It's very simple. Just sign in to your Google Merchant Center, then go to Settings > Linked Accounts > Google My Business.Link a Google My Business account to this Merchant Center account. A request will be sent to Google My Business account manager. They can approve the request from their Google My Business portal.",
      open:false
    },
    {
      title:"Is it necessary to connect a Google Ads account?",
      ans: "No, It's not necessary. But We suggest connecting for the Shopping campaign and Your product advertising.",
      open:false
    },
    {
      title:"This app have free plan?",
      ans: "Shopping Feed For Google has 7 days of the free trial. So you can connect your store with Google Merchant and install our app to your Shopify store to test.",
      open:false
    },
    {
      title:"Why my product is not updated in Google Shopping?",
      ans: "Google Content API for Shopping will take time to update. Google suggested 2 hours but we suggest it updates less than a half-hour.",
      open:false
    },
    {
      title:"Can I Submit bulk Product?",
      ans: "Yes, you can select multiple products and hit the add-in queue button and Submit with common option.",
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