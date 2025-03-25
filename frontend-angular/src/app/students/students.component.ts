import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {StudentsService} from "../services/students.service";
import {Student} from "../model/students.model";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit,AfterViewInit {
  public students !: Array<Student>;
  public dataSource:any;
  public displayedColumns=["id","firstName","lastName","payments"];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router:Router,private studentService:StudentsService) {
  }


  ngOnInit(): void {
    this.studentService.getStudents().subscribe({
        next:data => {
          this.students=data;
          this.dataSource=new MatTableDataSource(this.students);
        },
        error:err=> {
          console.log(err);
        }
      });
    }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort;
  }

  filterStudents(event: Event) {
    let value=(event.target as HTMLInputElement).value;
    this.dataSource.filter=value
  }

  getPayments(student:any) {
    this.router.navigateByUrl("/payments");
  }
}
