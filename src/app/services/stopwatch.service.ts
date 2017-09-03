// import {Injectable} from '@angular/core';
// import {Lap} from '../models/lap.model'
// import {TimeRecord} from '../models/time-record.model';
// import {Rider} from '../models/rider.model'


// @Injectable()
// export class StopwatchService {
//     public laps: Lap[];
//     public timeRecords: TimeRecord[];

//     private startAt: number;
//     private lapTime: number;

//     constructor() {
//         this.reset();
//     }

//     recordTimeIntermediate(rider: Rider){ //TODO testare
//         console.log('a');
        
//         let timeMs = this.startAt
//         ? this.lapTime + this.now() - this.startAt
//         : this.lapTime;
//         this.timeRecords[this.timeRecords.length - 1].lap.stop(timeMs);
//         this.timeRecords.push(new TimeRecord(rider, new Lap(timeMs) ))
//         console.log('b');
        
//        // debugger;
//     }

//   /*  
//     lap() {
//         let timeMs = this.startAt
//                 ? this.lapTime + this.now() - this.startAt
//                 : this.lapTime;

//         this.laps[this.laps.length - 1].stop(timeMs);
//         this.laps.push(new Lap(timeMs));
//     }
//     */

//     now() {
//         return _now();
//     }

//     reset() {
//         this.startAt = 0;
//         this.lapTime = 0;

//         /*
//         this.laps = new Array<Lap>();
//         this.laps.push(new Lap(0));
//         */

//         this.timeRecords = new Array<TimeRecord>();
//         this.timeRecords.push(new TimeRecord(null, new Lap(0)));
//     }

//     start() {
//         this.startAt = this.startAt
//             ? this.startAt
//             : this.now();
//     }

//     stop() {
//         let timeMs = this.startAt
//                 ? this.lapTime + this.now() - this.startAt
//                 : this.lapTime;

//         this.lapTime = timeMs;
//         this.laps[this.laps.length - 1].stop(timeMs);

//         this.startAt = 0;
//     }

//     time() {
//         return this.lapTime
//             + (this.startAt ? this.now() - this.startAt : 0);
//     }
// }

// function _now() {
//     return (new Date()).getTime();
// }