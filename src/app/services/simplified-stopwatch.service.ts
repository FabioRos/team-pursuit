import {Injectable} from '@angular/core';
import {Lap} from '../models/lap.model'
import {TimeRecord} from '../models/time-record.model';
import {Rider} from '../models/rider.model'


@Injectable()
export class SimplifiedStopwatchService {

    public timeRecords: TimeRecord[];
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
        this.endTime = null;
        this.timeRecords = [];
        this.giroTimes = [];
        this.lastRecordedTime = 0;
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

    recordTimeIntermediate(rider: Rider){ //TODO testare
    var timestamp_: number = (new Date()).getTime()
    this.giroTimes.push(timestamp_);
    var lenght: number = this.giroTimes.length;
    var lap: Lap = new Lap(this.giroTimes[lenght-2],this.giroTimes[lenght-1] );
    this.timeRecords.push(new TimeRecord(rider, lap));
    this.lastRecordedTime = timestamp_ - this.startTime
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
