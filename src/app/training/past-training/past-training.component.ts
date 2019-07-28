import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service'
import { Exercise } from '../exercise.model';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, OnDestroy {
  displayedColumns:string[] = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  subscription:Subscription;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private service:TrainingService) { }

  ngOnInit() {
    this.subscription = this.service.myExercisesChanged
    .subscribe(myExercises => {
      this.dataSource.data = myExercises;
    }); 
    this.dataSource.paginator = this.paginator;
    this.service.fetchMyExercises();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  doFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

}
