import { Exercise } from "./exercise.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AngularFirestore } from "angularfire2/firestore";
import { map } from "rxjs/operators";

@Injectable({
    providedIn:'root'
})
export class TrainingService {
    private availableExercises: Exercise[] = [];

    private runningExercise:Exercise;

    public exerciseChanged = new Subject<Exercise>();

    public exercisesChanged = new Subject<Exercise[]>();

    private exercises: Exercise[] = [];

    constructor(private db: AngularFirestore) {
        
    }

    fetchAvailableExercises() {
        //Firebase maneja esta subscripcion por nosostros, asi que si vuelve a 
        //crear este componente, no se crea una nueva subscripcion
        this.db.collection('availableExercises')
        .snapshotChanges()
        .pipe(
            map( docArray => {
                return docArray.map(doc => {
                    return {
                        id: doc.payload.doc.id,
                        ...doc.payload.doc.data(),
                    };
                });
            })
        ).subscribe(exercises => {
            this.availableExercises = exercises;
            this.exercisesChanged.next([...this.availableExercises]);
        });
    }

    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercises.find(ex => ex.id == selectedId);
        this.exerciseChanged.next({...this.runningExercise});
    }

    completeExercise() {
        this.exercises.push({
            ...this.runningExercise, 
            date: new Date(),
            state: 'completed',
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number) {
        this.exercises.push({
            ...this.runningExercise, 
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.duration * (progress / 100),
            date: new Date(),
            state: 'canceled',
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    getRunningExercise () {
        return {...this.runningExercise};
    }

    getExercises () {
        return this.exercises.slice();
    }


}