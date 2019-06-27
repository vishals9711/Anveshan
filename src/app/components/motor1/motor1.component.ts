import { Component, OnInit } from '@angular/core';
import { IBMIoTPService } from '../../services/iotp/ibmIoTP.service';
import { LiveDataService } from '../../services/livedata/liveData.service';



// Carbon Design Framework
import { DataTable } from 'carbon-components';
import { Checkbox } from 'carbon-components';

@Component({
    templateUrl: './motor1.component.html',
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

export class dmotor1Component implements OnInit {
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
    id = 'chart1';
    width = 700;
    height = 500;
    type = 'mscombi2d';
    dataFormat = 'json';
    dataSource_VRMS_1_volt;
    dataSource_VRMS_2_volt;
    dataSource_VRMS_1_curr;
    dataSource_VRMS_2_curr;
    dataSource_VTHD_1_THD;
    dataSource_VTHD_2_THD;
    title = 'Angular4 FusionCharts Sample';
    count = 0;
    counter = 0;

    var_1_time: any;
    var_2_time: any;
    var_1_interval: any;
    var_2_interval: any;

    // Live Data
    connection;
    liveData = {};
    messages = [];
    message;
    mqttStatus: boolean = false;
    liveDataSubscribedOnInit: boolean = false;

    constructor(private ibmIoTP: IBMIoTPService, private liveDataService: LiveDataService) {
        this.dataSource_VRMS_1_volt = {

            "chart": {
                "caption": "Voltage",
                "xaxisname": "X-axis",
                "yaxisname": "Y-axis",
                "numberprefix": "V",
                "theme": "ocean"
            },
            "categories": [{
                "category": [{
                    "label": "0"
                },
                {
                    "label": "1"
                },
                {
                    "label": "2"
                },
                {
                    "label": "3"
                },
                {
                    "label": "4"
                },

                {
                    "label": "5"
                },

                {
                    "label": "6"
                },

                {
                    "label": "7"
                },

                {
                    "label": "8"
                },

                {
                    "label": "9"
                },

                {
                    "label": "10"
                },

                {
                    "label": "11"
                }
                ]
            }],
            "dataset": [{
                "seriesname": "Phase A",
                "renderas": "line",
                "data": [{
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                }

                ]
            },
            {
                "seriesname": "Phase B",
                "renderas": "line",
                "showvalues": "0",
                "data": [{
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                }

                ]
            },
            {
                "seriesname": "Phase C",
                "renderas": "line",
                "showvalues": "0",
                "data": [{
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                }
                ]
            }
            ]
        },
            this.dataSource_VRMS_2_volt = {

                "chart": {
                    "caption": "Voltage",
                    "xaxisname": "X-axis",
                    "yaxisname": "Y-axis",
                    "numberprefix": "V",
                    "theme": "ocean",
                    //"yAxisMinValue": "180"
                },
                "categories": [{
                    "category": [{
                        "label": "0"
                    },
                    {
                        "label": "1"
                    },
                    {
                        "label": "2"
                    },
                    {
                        "label": "3"
                    },
                    {
                        "label": "4"
                    },

                    {
                        "label": "5"
                    },

                    {
                        "label": "6"
                    },

                    {
                        "label": "7"
                    },

                    {
                        "label": "8"
                    },

                    {
                        "label": "9"
                    },

                    {
                        "label": "10"
                    },

                    {
                        "label": "11"
                    }
                    ]
                }],
                "dataset": [{
                    "seriesname": "Phase A",
                    "renderas": "line",
                    "data": [{
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    }

                    ]
                },
                {
                    "seriesname": "Phase B",
                    "renderas": "line",
                    "showvalues": "0",
                    "data": [{
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    }

                    ]
                },
                {
                    "seriesname": "Phase C",
                    "renderas": "line",
                    "showvalues": "0",
                    "data": [{
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    }
                    ]
                }
                ]
            },
            this.dataSource_VRMS_1_curr = {

                "chart": {
                    "caption": "Current",
                    "xaxisname": "X-axis",
                    "yaxisname": "Y-axis",
                    "numberprefix": "A",
                    "theme": "ocean",
                },
                "categories": [{
                    "category": [{
                        "label": "0"
                    },
                    {
                        "label": "1"
                    },
                    {
                        "label": "2"
                    },
                    {
                        "label": "3"
                    },
                    {
                        "label": "4"
                    },

                    {
                        "label": "5"
                    },

                    {
                        "label": "6"
                    },

                    {
                        "label": "7"
                    },

                    {
                        "label": "8"
                    },

                    {
                        "label": "9"
                    },

                    {
                        "label": "10"
                    },

                    {
                        "label": "11"
                    }
                    ]
                }],
                "dataset": [{
                    "seriesname": "Phase A",
                    "renderas": "line",
                    "data": [{
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    }

                    ]
                },
                {
                    "seriesname": "Phase B",
                    "renderas": "line",
                    "showvalues": "0",
                    "data": [{
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    }

                    ]
                },
                {
                    "seriesname": "Phase C",
                    "renderas": "line",
                    "showvalues": "0",
                    "data": [{
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    }
                    ]
                }
                ]
            },
            this.dataSource_VRMS_2_curr = {

                "chart": {
                    "caption": "Current",
                    "xaxisname": "X-axis",
                    "yaxisname": "Y-axis",
                    "numberprefix": "A",
                    "theme": "ocean"
                },
                "categories": [{
                    "category": [{
                        "label": "0"
                    },
                    {
                        "label": "1"
                    },
                    {
                        "label": "2"
                    },
                    {
                        "label": "3"
                    },
                    {
                        "label": "4"
                    },

                    {
                        "label": "5"
                    },

                    {
                        "label": "6"
                    },

                    {
                        "label": "7"
                    },

                    {
                        "label": "8"
                    },

                    {
                        "label": "9"
                    },

                    {
                        "label": "10"
                    },

                    {
                        "label": "11"
                    }
                    ]
                }],
                "dataset": [{
                    "seriesname": "Phase A",
                    "renderas": "line",
                    "data": [{
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    }

                    ]
                },
                {
                    "seriesname": "Phase B",
                    "renderas": "line",
                    "showvalues": "0",
                    "data": [{
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    }

                    ]
                },
                {
                    "seriesname": "Phase C",
                    "renderas": "line",
                    "showvalues": "0",
                    "data": [{
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    }
                    ]
                }
                ]
            },
            this.dataSource_VTHD_1_THD = {

                "chart": {
                    "caption": "Voltage THD",
                    "xaxisname": "X-axis",
                    "yaxisname": "Y-axis",
                    "numberprefix": "V",
                    "theme": "ocean"
                },
                "categories": [{
                    "category": [{
                        "label": "0"
                    },
                    {
                        "label": "1"
                    },
                    {
                        "label": "2"
                    },
                    {
                        "label": "3"
                    },
                    {
                        "label": "4"
                    },

                    {
                        "label": "5"
                    },

                    {
                        "label": "6"
                    },

                    {
                        "label": "7"
                    },

                    {
                        "label": "8"
                    },

                    {
                        "label": "9"
                    },

                    {
                        "label": "10"
                    },

                    {
                        "label": "11"
                    }
                    ]
                }],
                "dataset": [{
                    "seriesname": "Phase A",
                    "renderas": "line",
                    "data": [{
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    }

                    ]
                },
                {
                    "seriesname": "Phase B",
                    "renderas": "line",
                    "showvalues": "0",
                    "data": [{
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    }

                    ]
                },
                {
                    "seriesname": "Phase C",
                    "renderas": "line",
                    "showvalues": "0",
                    "data": [{
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    }
                    ]
                }
                ]
            },
            this.dataSource_VTHD_2_THD = {

                "chart": {
                    "caption": "Voltage THD",
                    "xaxisname": "X-axis",
                    "yaxisname": "Y-axis",
                    "numberprefix": "V",
                    "theme": "ocean"
                },
                "categories": [{
                    "category": [{
                        "label": "0"
                    },
                    {
                        "label": "1"
                    },
                    {
                        "label": "2"
                    },
                    {
                        "label": "3"
                    },
                    {
                        "label": "4"
                    },

                    {
                        "label": "5"
                    },

                    {
                        "label": "6"
                    },

                    {
                        "label": "7"
                    },

                    {
                        "label": "8"
                    },

                    {
                        "label": "9"
                    },

                    {
                        "label": "10"
                    },

                    {
                        "label": "11"
                    }
                    ]
                }],
                "dataset": [{
                    "seriesname": "Phase A",
                    "renderas": "line",
                    "data": [{
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    }

                    ]
                },
                {
                    "seriesname": "Phase B",
                    "renderas": "line",
                    "showvalues": "0",
                    "data": [{
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    }
                    ]
                },
                {
                    "seriesname": "Phase C",
                    "renderas": "line",
                    "showvalues": "0",
                    "data": [{
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    }
                    ]
                }
                ]
            }

    }

    ngOnInit() {
        this.connection = this.liveDataService.getMessages().subscribe(message => {
            this.messages.push(message);

            if (message["type"] === "new_sensorData") {
                //console.log("TEXT", message["text"]);

                var payload1 = JSON.parse(message["text"])["d"];
                const deviceId1 = "1";
                const deviceId2 = "2";
                console.log(payload1);
                console.log("---------------------------------");
                console.log(payload1.id);
                console.log("-----------------------------")


                // console.log("Device ID foreach "+device);

                if (payload1.id === "1") {
                    console.log('-----------------------------------------');
                    console.log('1st pass');
                    if (payload1.type = "VRMS") {
                        console.log('2nd pass');
                        //device["data"] = payload1;
                        this.updateData_1_volt_A(payload1['1']);
                        this.updateData_1_volt_B(payload1['2']);
                        this.updateData_1_volt_C(payload1['3']);
                        this.updateData_1_freq_D(payload1['4']);
                        this.updateData_1_freq_E(payload1['5']);
                        this.updateData_1_freq_F(payload1['6']);
                        this.updateData_1_volt_VTHD_A(payload1['8']);
                        this.updateData_1_volt_VTHD_B(payload1['9']);
                        this.updateData_1_volt_VTHD_C(payload1['10']);
                    }
                }
                if (payload1.id === "2") {
                    console.log('1st pass');
                    if (payload1.type = 'VRMS') {
                        console.log('2nd pass');
                        // device["data"] = payload1;
                        this.updateData_2_volt_A(payload1['1']);
                        this.updateData_2_volt_B(payload1['2']);
                        this.updateData_2_volt_C(payload1['3']);
                        this.updateData_2_freq_D(payload1['4']);
                        this.updateData_2_freq_E(payload1['5']);
                        this.updateData_2_freq_F(payload1['6']);
                        this.updateData_2_volt_VTHD_A(payload1['8']);
                        this.updateData_2_volt_VTHD_B(payload1['9']);
                        this.updateData_2_volt_VTHD_C(payload1['10']);
                    }

                }


                // this.updateData_volt_A(payload1['1']);
                // this.updateData_volt_B(payload1['2']);
                // this.updateData_volt_C(payload1['3']);
                //this.updateData_freq_D(payload1['4']);
                //this.updateData_freq_E(payload1['5']);
                //this.updateData_freq_F(payload1['6']);
                //this.updateData_THD(payload['voltage']);

            } else if (message["type"] === "mqtt_status") {
                this.mqttStatus = message["text"].connected;
            }
        });

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
                console.log(devices);

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

    ////////////////////////////////DEVICE 1

    updateData_1_volt_A(value) {
        if (this.count <= 4) {
            this.dataSource_VRMS_1_volt.dataset[0]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 3; this.counter++) {

                this.dataSource_VRMS_1_volt.dataset[0]['data'][this.counter].value = this.dataSource_VRMS_1_volt.dataset[0]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_1_volt.dataset[0]['data'][4].value = value;
        }
    }
    updateData_1_volt_B(value) {
        if (this.count <= 4) {
            this.dataSource_VRMS_1_volt.dataset[1]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 3; this.counter++) {

                this.dataSource_VRMS_1_volt.dataset[1]['data'][this.counter].value = this.dataSource_VRMS_1_volt.dataset[1]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_1_volt.dataset[1]['data'][4].value = value;
        }
    }
    updateData_1_volt_C(value) {
        if (this.count <= 4) {
            this.dataSource_VRMS_1_volt.dataset[2]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 3; this.counter++) {

                this.dataSource_VRMS_1_volt.dataset[2]['data'][this.counter].value = this.dataSource_VRMS_1_volt.dataset[2]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_1_volt.dataset[2]['data'][4].value = value;
        }
    }
    updateData_1_freq_D(value) {
        if (this.count <= 4) {
            this.dataSource_VRMS_1_curr.dataset[0]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 3; this.counter++) {

                this.dataSource_VRMS_1_curr.dataset[0]['data'][this.counter].value = this.dataSource_VRMS_1_curr.dataset[0]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_1_curr.dataset[0]['data'][4].value = value;
        }
    }
    updateData_1_freq_E(value) {
        if (this.count <= 4) {
            this.dataSource_VRMS_1_curr.dataset[1]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 3; this.counter++) {

                this.dataSource_VRMS_1_curr.dataset[1]['data'][this.counter].value = this.dataSource_VRMS_1_curr.dataset[1]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_1_curr.dataset[1]['data'][4].value = value;
        }
    }
    updateData_1_freq_F(value) {
        if (this.count <= 4) {
            this.dataSource_VRMS_1_curr.dataset[2]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 3; this.counter++) {

                this.dataSource_VRMS_1_curr.dataset[2]['data'][this.counter].value = this.dataSource_VRMS_1_curr.dataset[2]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_1_curr.dataset[2]['data'][4].value = value;
        }
    }
    ////////////////////////////////DEVICE 2
    updateData_2_volt_A(value) {
        if (this.count <= 4) {
            this.dataSource_VRMS_2_volt.dataset[0]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 3; this.counter++) {

                this.dataSource_VRMS_2_volt.dataset[0]['data'][this.counter].value = this.dataSource_VRMS_2_volt.dataset[0]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_2_volt.dataset[0]['data'][4].value = value;
        }
    }
    updateData_2_volt_B(value) {
        if (this.count <= 4) {
            this.dataSource_VRMS_2_volt.dataset[1]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 3; this.counter++) {

                this.dataSource_VRMS_2_volt.dataset[1]['data'][this.counter].value = this.dataSource_VRMS_2_volt.dataset[1]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_2_volt.dataset[1]['data'][4].value = value;
        }
    }
    updateData_2_volt_C(value) {
        if (this.count <= 4) {
            this.dataSource_VRMS_2_volt.dataset[2]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 3; this.counter++) {

                this.dataSource_VRMS_2_volt.dataset[2]['data'][this.counter].value = this.dataSource_VRMS_2_volt.dataset[2]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_2_volt.dataset[2]['data'][4].value = value;
        }
    }
    updateData_2_freq_D(value) {
        if (this.count <= 4) {
            this.dataSource_VRMS_2_curr.dataset[0]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 3; this.counter++) {

                this.dataSource_VRMS_2_curr.dataset[0]['data'][this.counter].value = this.dataSource_VRMS_2_curr.dataset[0]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_2_curr.dataset[0]['data'][4].value = value;
        }
    }
    updateData_2_freq_E(value) {
        if (this.count <= 4) {
            this.dataSource_VRMS_2_curr.dataset[1]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 3; this.counter++) {

                this.dataSource_VRMS_2_curr.dataset[1]['data'][this.counter].value = this.dataSource_VRMS_2_curr.dataset[1]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_2_curr.dataset[1]['data'][4].value = value;
        }
    }
    updateData_2_freq_F(value) {
        if (this.count <= 4) {
            this.dataSource_VRMS_2_curr.dataset[2]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 3; this.counter++) {

                this.dataSource_VRMS_2_curr.dataset[2]['data'][this.counter].value = this.dataSource_VRMS_2_curr.dataset[2]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_2_curr.dataset[2]['data'][4].value = value;
        }
    }

    updateData_1_volt_VTHD_A(value) {
        if (this.count <= 4) {
            this.dataSource_VTHD_1_THD.dataset[0]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 3; this.counter++) {

                this.dataSource_VTHD_1_THD.dataset[0]['data'][this.counter].value = this.dataSource_VTHD_1_THD.dataset[0]['data'][this.counter + 1].value;
            }
            this.dataSource_VTHD_1_THD.dataset[0]['data'][4].value = value;
        }
    }
    updateData_1_volt_VTHD_B(value) {
        if (this.count <= 4) {
            this.dataSource_VTHD_1_THD.dataset[1]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 3; this.counter++) {

                this.dataSource_VTHD_1_THD.dataset[1]['data'][this.counter].value = this.dataSource_VTHD_1_THD.dataset[1]['data'][this.counter + 1].value;
            }
            this.dataSource_VTHD_1_THD.dataset[1]['data'][4].value = value;
        }
    }
    updateData_1_volt_VTHD_C(value) {
        if (this.count <= 4) {
            this.dataSource_VTHD_1_THD.dataset[2]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 3; this.counter++) {

                this.dataSource_VTHD_1_THD.dataset[2]['data'][this.counter].value = this.dataSource_VTHD_1_THD.dataset[2]['data'][this.counter + 1].value;
            }
            this.dataSource_VTHD_1_THD.dataset[2]['data'][4].value = value;
        }
    }
    /////////////////////////Device 2
    updateData_2_volt_VTHD_A(value) {
        if (this.count <= 11) {
            this.dataSource_VTHD_2_THD.dataset[0]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_VTHD_2_THD.dataset[0]['data'][this.counter].value = this.dataSource_VTHD_2_THD.dataset[0]['data'][this.counter + 1].value;
            }
            this.dataSource_VTHD_2_THD.dataset[0]['data'][11].value = value;
        }
    }
    updateData_2_volt_VTHD_B(value) {
        if (this.count <= 11) {
            this.dataSource_VTHD_2_THD.dataset[1]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_VTHD_2_THD.dataset[1]['data'][this.counter].value = this.dataSource_VTHD_2_THD.dataset[1]['data'][this.counter + 1].value;
            }
            this.dataSource_VTHD_2_THD.dataset[1]['data'][11].value = value;
        }
    }
    updateData_2_volt_VTHD_C(value) {
        if (this.count <= 11) {
            this.dataSource_VTHD_2_THD.dataset[2]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_VTHD_2_THD.dataset[2]['data'][this.counter].value = this.dataSource_VTHD_2_THD.dataset[2]['data'][this.counter + 1].value;
            }
            this.dataSource_VTHD_2_THD.dataset[2]['data'][11].value = value;
        }
    }

};