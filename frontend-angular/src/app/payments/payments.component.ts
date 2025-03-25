import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {StudentsService} from "../services/students.service";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit {
    public payments: any;
    public dataSource:any;
    public displayedColumns=['id','date','amount','type','status','firstName'];

    //permet de rechercher dans la partie html un objet de type matPginator et on l'affect a cette variable.
    @ViewChild(MatPaginator) paginator! :MatPaginator;

    @ViewChild(MatSort) sort!:MatSort;

    constructor(private studentService:StudentsService) {

    }

    ngOnInit(): void {
      this.studentService.getAllPayments().subscribe({
        next:data => {
            this.payments=data;
            this.dataSource=new MatTableDataSource(this.payments);
            this.dataSource.paginator=this.paginator;
            this.dataSource.sort=this.sort;
        },
        error:err=>{
            console.log(err);
        }
      });
    }

}
