import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {


  availableExercises:Exercise[];

  constructor(private trainingService:TrainingService) { }

  ngOnInit() {
    this.availableExercises = this.trainingService.getAvailableExercises();
  }

  start(form:NgForm){
    this.trainingService.startExercise(form.value.exercise);
  }

}
