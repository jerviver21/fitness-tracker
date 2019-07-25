import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  availableExercises:Exercise[];
  subscription: Subscription;

  constructor(private trainingService:TrainingService) { }

  ngOnInit() {
    this.trainingService.fetchAvailableExercises();
    this.subscription = this.trainingService.exercisesChanged
    .subscribe( exercises => {
      this.availableExercises = exercises;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  start(form:NgForm){
    this.trainingService.startExercise(form.value.exercise);
  }

}
