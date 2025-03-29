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
        const a = document.createElement('a');
        a.href = this.pdfFileUrl;
        a.download = `payment-${this.paymentId}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(this.pdfFileUrl);
        a.remove();
      },(error)=>{
        console.log(error);
      }
    );
  }

}
