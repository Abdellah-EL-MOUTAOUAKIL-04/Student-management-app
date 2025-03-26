import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrl: './new-payment.component.css'
})
export class NewPaymentComponent implements OnInit {
  paymentFormGroup!:FormGroup;
  studentCode!:string;
  constructor(private fb:FormBuilder,private activatedRoute:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.studentCode=this.activatedRoute.snapshot.params['code'];
    this.paymentFormGroup=this.fb.group({
      date:this.fb.control(''),
      amount:this.fb.control(''),
      type:this.fb.control(''),
      studentCode:this.fb.control(this.studentCode),
      file:this.fb.control('')
    });
  }

}
