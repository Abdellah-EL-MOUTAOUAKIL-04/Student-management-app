import {Component, OnInit} from '@angular/core';
import {StudentsService} from "../services/students.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent implements OnInit{
  paymentId!:number;
  pdfFileUrl!:string;
  constructor(private studentService:StudentsService,private route:ActivatedRoute) {
  }
  ngOnInit(): void {
    this.paymentId=this.route.snapshot.params['id'];
    this.studentService.getPaymentDetails(this.paymentId).subscribe(
      (response)=>{
        const blob = new Blob([response], { type: 'application/pdf' });
        this.pdfFileUrl = window.URL.createObjectURL(blob);
      },(error)=>{
        console.log(error);
      }
    );
  }

  afterLoadComplete($event: any){

  }
}
