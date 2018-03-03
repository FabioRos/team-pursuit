import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs/Rx";


import {Lap} from '../models/lap.model'
import {TimeRecord} from '../models/time-record.model';
import {Rider} from '../models/rider.model'
import { timestamp } from 'rxjs/operator/timestamp';


@Injectable()
export class SimplifiedStopwatchService {

    //https://stackoverflow.com/questions/39544683/angular2-subscribe-to-changes-in-service-data
    private timeRecords:BehaviorSubject<Array<TimeRecord>> = new BehaviorSubject([]);
    
    //public timeRecords: TimeRecord[];
    
    public currentTime: number;

    private startTime: number;
    private endTime: number;
    private lastRecordedTime: number;

    constructor() {
        this.reset();
    }


    reset(){
        this.startTime = null;
        this.endTime = null;    //If this field is present, time tracking has been completed.
        this.lastRecordedTime = 0;
        this.currentTime = null;
        while ( this.timeRecords.getValue().length) {  this.timeRecords.getValue().pop();} //clear the graph      
        this.timeRecords.next(this.timeRecords.getValue())  //emit the entire array
    }

    start() {
        var timestamp_ = (new Date()).getTime();
        this.startTime = timestamp_;
        this.currentTime = timestamp_;
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
        var lap: Lap = new Lap(this.currentTime, recorded_timestamp_ );
        this.currentTime = timestamp_;
        this.timeRecords.getValue().push(new TimeRecord(rider, lap));
        this.timeRecords.next(this.timeRecords.getValue())  //emit the entire array
        this.lastRecordedTime = timestamp_ - this.startTime
        return this.timeRecords[-1];
    }

    getAllTimeRecords(): Observable<Array<TimeRecord>>{
        return this.timeRecords.asObservable();
    }

    time() {
        return  this.startTime ?  ((new Date()).getTime() -  this.startTime) : 0
    }

    lastIntervalFullTime(intervalRelevationNumber: number){

        if (this.timeRecordsLength() < intervalRelevationNumber){
                 return 0;
        }else{
            return this.timeRecords.getValue()[intervalRelevationNumber].lap.endMs - this.startTime;
        }
    }

    timeRecordsLength(){
        return this.timeRecords.getValue().length-1
    }

    getLastRecordedTime(){
        return this.lastRecordedTime;
    }
}
