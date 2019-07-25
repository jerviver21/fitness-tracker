import { Component, OnInit, ViewChild } from '@angular/core';
import { TrainingService } from '../training.service'
import { Exercise } from '../exercise.model';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit {
  displayedColumns:string[] = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private service:TrainingService) { }

  ngOnInit() {
    this.dataSource.data = this.service.getExercises();
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

}
