import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service'
import { Exercise } from '../exercise.model';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit {
  displayedColumns:string[] = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  constructor(private service:TrainingService) { }

  ngOnInit() {
    this.dataSource.data = this.service.getExercises();
  }

  doFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

}
