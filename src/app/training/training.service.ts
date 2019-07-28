import { Exercise } from "./exercise.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AngularFirestore } from "angularfire2/firestore";
import { map } from "rxjs/operators";

@Injectable({
    providedIn:'root'
})
export class TrainingService {
    
    public exerciseChanged = new Subject<Exercise>();

    public exercisesChanged = new Subject<Exercise[]>();

    public myExercisesChanged = new Subject<Exercise[]>();

    private availableExercises: Exercise[] = [];

    private runningExercise:Exercise;

    private myExercises: Exercise[] = [];

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
                    const data:Exercise = <Exercise>doc.payload.doc.data();
                    return {
                        id: doc.payload.doc.id,
                        ...data,
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
        this.addExercicesToDatabase({
            ...this.runningExercise, 
            date: new Date(),
            state: 'completed',
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number) {
        this.addExercicesToDatabase({
            ...this.runningExercise, 
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100),
            date: new Date(),
            state: 'canceled',
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    getRunningExercise () {
        return {...this.runningExercise};
    }

    fetchMyExercises () {
        this.db.collection('myExercises')
        .valueChanges()//No necesito id, no necesito snapshot
        .subscribe((exercises:Exercise[]) => {
            this.myExercises = exercises;
            this.myExercisesChanged.next([...this.myExercises]);
        });
    }

    addExercicesToDatabase(exercise: Exercise) {
        this.db.collection('myExercises').add(exercise);
    }


}