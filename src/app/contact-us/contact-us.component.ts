import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  private rForm : FormGroup;
  private post:any;
  private fName:string = '';
  private lName:string = '';
  private username: string = '';
  private email: string = '';
  private issue:string = '';
  private message:string = '';

  constructor(private fb: FormBuilder) { 
      this.rForm = fb.group({
        'fName': [null, Validators.required],
        'lName': [null, Validators.required],
        'issue': [null, Validators.required],
        'message': [null, Validators.required],
        
      })
  }
  ngOnInit(){}
  addPost(post){
    this.fName = post.fName;
    this.lName = post.lName;
  }
}
