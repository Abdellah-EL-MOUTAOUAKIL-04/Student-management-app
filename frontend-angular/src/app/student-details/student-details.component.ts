import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StudentsService} from "../services/students.service";
import {Payment} from "../model/students.model";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit {
  studentCode!:string;
  studentPayments!:Array<Payment>;
  paymentDataSource!:MatTableDataSource<Payment>;
  public displayedColumns=['id','date','amount','type','status','firstName'];


  constructor(private route:ActivatedRoute,
              private studentService:StudentsService,
              private router:Router) {
  }

  ngOnInit(): void {
    this.studentCode=this.route.snapshot.params['code'];
    this.studentService.getStudentsPayments(this.studentCode).subscribe({
        next:data => {
          this.studentPayments=data;
          this.paymentDataSource=new MatTableDataSource<Payment>(this.studentPayments);
          },
        error:err=> {
          console.log(err);
        }
      });
  }

  newPayment() {
    this.router.navigateByUrl(`/admin/new-payment/${this.studentCode}`);
  }
}
