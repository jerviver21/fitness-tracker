import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from '../stop-training/StopTrainingComponent';
import { TrainingService } from '../training.service';


@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  progress:number = 0;
  timer:number;

  constructor(private dialog:MatDialog, private service:TrainingService) { }

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer(){
    const step = this.service.getRunningExercise().duration / 100 * 1000;
    this.timer = setInterval(() => {
      this.progress = this.progress+5;
      if(this.progress == 100){
        clearInterval(this.timer);
        this.service.completeExercise();
      }
    }, 1000 );
  }

  onStop(){ 
    clearInterval(this.timer);

    const dialogRef =  this.dialog.open(StopTrainingComponent, {
      data: { progress: this.progress}
    });

    dialogRef.afterClosed().subscribe( result => {
      console.log(result);
      if(result){
        this.service.cancelExercise(this.progress);
      }else{
        this.startOrResumeTimer();
      }
    });


  }

}

