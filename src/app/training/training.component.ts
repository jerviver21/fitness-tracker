import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  trainingOngoing = false;

  exerciseSubscription: Subscription;

  constructor(private service:TrainingService) { }

  ngOnInit() {
    this.exerciseSubscription = this.service.exerciseChanged.subscribe(
      exercise => {
        if (exercise) {
          this.trainingOngoing =true;
        }else {
          this.trainingOngoing =false;
        }
        
      }
    );
  }


}
