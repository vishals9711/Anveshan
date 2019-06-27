import { Component, OnInit } from '@angular/core';
import { IBMIoTPService } from '../../services/iotp/ibmIoTP.service';
import { LiveDataService } from '../../services/livedata/liveData.service';
import { apiCallServer } from '../../services/apicallserver/apiCallServer.service';



// Carbon Design Framework
import { DataTable } from 'carbon-components';
import { Checkbox } from 'carbon-components';

@Component({
  templateUrl: './phase.component.html',
  styles: [`
    button[disabled] {
      opacity: 0.5;
      cursor:  not-allowed;
    }

    input[type="text"][disabled] {
      cursor: auto;
    }
  `]
})

export class phaseaComponent implements OnInit {
  // Devices List
  errorMessage: string;
  devices;
  totalDevices: number;
  bookmark: string;
  bookmarks = {};
  limit: number = 10;
  orderBy: string = "deviceId";
  currentPage: number = 1;
  totalPages: number = 0;
  gaugeType = "full";
  gaugeValue = 0;
  gaugeLabel1 = "VA/IA";
  gaugeLabel2 = "VB/IB";
  gaugeLabel3 = "VC/IC";
  gaugeLabel4 = "VA/VB";
  gaugeLabel5 = "VA/VC";
  gaugeLabel6 = "VC/VA";
  gaugeLabel7 = "IA/IB";
  gaugeLabel8 = "IB/IC";
  gaugeLabel9 = "IA/IC";
  gaugeAppendText = "°";
  gaugemin = 0;
  gaugemax = 360;
  gaugesize = 300;


  //variables
  Data_VA_IA: number = 0;
  Data_VB_IB: any;
  Data_VC_IC: any;
  Data_VA_VB: any;
  Data_VA_VC: any;
  Data_VC_VA: any;
  Data_IA_IB: any;
  Data_IB_IC: any;
  Data_IA_IC: any;




  // Live Data
  connection;
  liveData = {};
  messages = [];
  message;
  mqttStatus: boolean = false;
  liveDataSubscribedOnInit: boolean = false;
  responseData: any;
    gotData: any;


  constructor(private ibmIoTP: IBMIoTPService, private liveDataService: LiveDataService, public authService: apiCallServer) {
  }

  ngOnInit() {
    this.connection = this.liveDataService.getMessages().subscribe(message => {
      this.messages.push(message);

      if (message["type"] === "new_sensorData") {
        console.log("TEXT", message["text"]);

        var payload = JSON.parse(message["text"])["d"];
        this.messages.push(message);
        const deviceId = payload["id"];


        if (payload.id === "2") {
          if (payload.type === "PHASE") {
            console.log("-------------------------");
            console.log("2nd Pass");
            console.log("---------------------");
            this.Data_VA_IA = (payload['1']);
            this.Data_VB_IB = (payload['2']);
            this.Data_VC_IC = (payload['3']);
            this.Data_VA_VB = (payload['4']);
            this.Data_VA_VC = (payload['5']);
            this.Data_VC_VA = (payload['6']);
            this.Data_IA_IB = (payload['7']);
            this.Data_IB_IC = (payload['8']);
            this.Data_IA_IC = (payload['9']);
          }
        }

      } else if (message["type"] === "mqtt_status") {
        this.mqttStatus = message["text"].connected;
      }
    }



    );

    this.getDevices();

    this.mqttStatusInquiry();
  }

  getDevices(bookmark?: string, pagination?: string) {
    var params = {
      bookmark: bookmark,
      limit: this.limit.toString(),
      orderBy: this.orderBy
    };

    this.ibmIoTP.getDevices(params).then(
      devices => {
        console.log("Devices:", devices);

        if (pagination) {
          if (pagination === "next") this.currentPage = this.currentPage + 1;
          else if (pagination === "prev") this.currentPage = this.currentPage - 1;
        } else {
          this.currentPage = 1;
        }

        this.devices = devices["results"];

        this.totalDevices = devices["meta"].total_rows;
        this.totalPages = Math.ceil(this.totalDevices / this.limit);

        this.bookmark = devices["bookmark"];
        this.bookmarks[this.currentPage] = devices["bookmark"];

        // Get last cached event for all devices loaded
        var index = 0;
        for (let device of this.devices) {
          this.ibmIoTP.getLastCachedEvent(device.deviceId).then(
            eventData => {
              console.log("Event:", atob(eventData["payload"]));

              device["data"] = JSON.parse(atob(eventData["payload"]))["d"];
            }, error => this.errorMessage = <any>error);

          // Only runs this code when the page is loading for the first time
          if (!this.liveDataSubscribedOnInit && index < 5) {
            this.setLiveData(index, true);

            index += 1;
          }
        }

        this.liveDataSubscribedOnInit = true;
      }, error => this.errorMessage = <any>error);
  }

  revertSort() {
    this.orderBy = (this.orderBy.charAt(0) !== '-') ? ("-" + this.orderBy) : (this.orderBy.substring(1));

    this.getDevices();
  }

  sum(a, b) {
    return parseInt(a) + parseInt(b);
  }

  nextPage() {
    this.getDevices(this.bookmark, "next");
  }

  prevPage() {
    this.getDevices(this.bookmarks[this.currentPage - 2], "prev");
  }

  sendMessage() {
    this.liveDataService.sendMessage('new-data', this.message);
  }

  mqttStatusInquiry() {
    this.liveDataService.sendMessage('mqtt_status_inquiry', {});
  }

  setLiveData(index, turnOn) {
    var deviceId = this.devices[index].deviceId;

    if (turnOn) {
      console.log("Turn ON Live Data for", deviceId);
    } else {
      console.log("Turn OFF Live Data for", deviceId);
    }

    this.liveData[deviceId] = turnOn;

    const socketData = {
      deviceId: this.devices[index].deviceId,
      turnOn: this.liveData[deviceId]
    };

    this.liveDataService.sendMessage('mqtt_set', JSON.stringify(socketData));
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
  sendDataServer(data) {
    this.authService.postData(data).then((result) => {
        this.responseData = result;
        if (this.responseData) {
            console.log(this.responseData);

        }
        else { console.log("User already exists"); }
    }, (err) => {
        // Error log
    });
}

getDataServer(data) {
    this.authService.getData(data).then((result) => {
        this.gotData = result;
        if (this.gotData) {
            console.log(this.gotData);
        }
        else { console.log("User already exists"); }
    }, (err) => {
        // Error log
    });
}

};