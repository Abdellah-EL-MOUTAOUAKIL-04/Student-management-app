import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit,AfterViewInit {
  public students: any;
  public dataSource:any;
  public displayedColumns=["id","firstName","lastName","payments"];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router:Router) {
  }


  ngOnInit(): void {
    this.students = [];
    for(let i = 0; i < 100; i++){
        this.students.push({
          id:i,
          firstName:"abde"+Math.random().toString(3),
          lastName:"mota"+Math.random().toString(4),
        });
    }
    this.dataSource=new MatTableDataSource(this.students);
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
