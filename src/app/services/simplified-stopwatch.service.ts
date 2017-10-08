import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs/Rx";


import {Lap} from '../models/lap.model'
import {TimeRecord} from '../models/time-record.model';
import {Rider} from '../models/rider.model'


@Injectable()
export class SimplifiedStopwatchService {

    //https://stackoverflow.com/questions/39544683/angular2-subscribe-to-changes-in-service-data
    private timeRecords:BehaviorSubject<Array<TimeRecord>> = new BehaviorSubject([]);
    
    //public timeRecords: TimeRecord[];
    
    public currentTime: number;

    private startTime: number;
    private endTime: number;
    private giroTimes: number[];
    private lastRecordedTime: number;

    constructor() {
        this.reset();
    }


    reset(){
        this.startTime = null;
        this.endTime = null;    //If this field is present, time tracking has been completed.
        this.giroTimes = [];
        this.lastRecordedTime = 0;
        this.currentTime = null;
        while ( this.timeRecords.getValue().length) {  this.timeRecords.getValue().pop();} //clear the graph      
        this.timeRecords.next(this.timeRecords.getValue())  //emit the entire array
    }

    start() {
        this.startTime = (new Date()).getTime();
        this.giroTimes.push(this.startTime);
    }

    stop() {
        this.endTime = (new Date()).getTime();
    }

    getStartTime(){
        return this.startTime;
    }


    getEndTime(){
        return this.endTime;
    }

    recordTimeIntermediate(rider: Rider, recorded_timestamp_: number){ //TODO testare
        var timestamp_: number = recorded_timestamp_;
        this.giroTimes.push(timestamp_);
        var lenght: number = this.giroTimes.length;
        var lap: Lap = new Lap(this.giroTimes[lenght-2],this.giroTimes[lenght-1] );
        this.timeRecords.getValue().push(new TimeRecord(rider, lap));
        this.timeRecords.next(this.timeRecords.getValue())  //emit the entire array
        this.lastRecordedTime = timestamp_ - this.startTime
        return this.timeRecords[lenght-1];
    }

    getAllTimeRecords(): Observable<Array<TimeRecord>>{
        return this.timeRecords.asObservable();
    }

    time() {
        return  this.startTime ?  ((new Date()).getTime() -  this.startTime) : 0
    }

    lastIntervalFullTime(intervalRelevationNumber: number){
        if (this.giroTimes.length < intervalRelevationNumber){
            return 0;
        }
        var partalsSum_= (this.giroTimes[intervalRelevationNumber] - this.startTime);           
        return  this.startTime ?  partalsSum_ : 0;
    }

    getLastRecordedTime(){
        return this.lastRecordedTime;
    }

}
