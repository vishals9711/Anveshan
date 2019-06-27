import { Component, OnInit } from '@angular/core';
import { IBMIoTPService } from '../../services/iotp/ibmIoTP.service';
import { LiveDataService } from '../../services/livedata/liveData.service';
import { apiCallServer } from '../../services/apicallserver/apiCallServer.service';



// Carbon Design Framework
import { DataTable } from 'carbon-components';
import { Checkbox } from 'carbon-components';

@Component({
    templateUrl: './gridb.component.html',
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

export class gridbiComponent implements OnInit {
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
    width = '100%';
    height = 600;
    type = 'msline';
    dataFormat = 'json';
    bgColor = "#393d7c";
    dataSource_active_pwr;
    dataSource_app_pwr;
    dataSource_react_pwr;
    dataSource_act_eng;
    dataSource_app_eng;
    dataSource_react_eng;

    //Variables
    Data_1_act_A: any;
    Data_1_act_B: any;
    Data_1_act_C: any;
    Data_1_app_A: any;
    Data_1_app_B: any;
    Data_1_app_C: any;
    Data_1_react_A: any;
    Data_1_react_B: any;
    Data_1_react_C: any;
    Data_1_act_eng_A: any;
    Data_1_act_eng_B: any;
    Data_1_act_eng_C: any;
    Data_1_app_eng_A: any;
    Data_1_app_eng_B: any;
    Data_1_app_eng_C: any;
    Data_1_react_eng_A: any;
    Data_1_react_eng_B: any;
    Data_1_react_eng_C: any;


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
    var1: any;

    constructor(private ibmIoTP: IBMIoTPService, private liveDataService: LiveDataService) {
        this.dataSource_active_pwr = {

            "chart": {
                "caption": "Active Power",
                "xaxisname": "X-axis",
                "yaxisname": "Y-axis",
                "numbersuffix": "W",
                "theme": "ocean",
                "paletteColors": "#ff0000 ,#FFFF00,#0000FF",
                "showvalues": "0",


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

            this.dataSource_app_pwr = {

                "chart": {
                    "caption": "Apparent Power",
                    "xaxisname": "X-axis",
                    "yaxisname": "Y-axis",
                    "numbersuffix": "VA",
                    "theme": "ocean",
                    "paletteColors": "#ff0000 ,#FFFF00,#0000FF",
                    "showvalues": "0",

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

            this.dataSource_react_pwr = {

                "chart": {
                    "caption": "Reactive Power",
                    "xaxisname": "X-axis",
                    "yaxisname": "Y-axis",
                    "numbersuffix": "VAR",
                    "theme": "ocean",
                    "paletteColors": "#ff0000 ,#FFFF00,#0000FF",
                    "showvalues": "0",
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

            this.dataSource_act_eng = {

                "chart": {
                    "caption": "Apparent Energy",
                    "xaxisname": "X-axis",
                    "yaxisname": "Y-axis",
                    "numbersuffix": "KWhr",
                    "theme": "ocean",
                    "paletteColors": "#ff0000 ,#FFFF00,#0000FF",
                    "showvalues": "0",
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
            this.dataSource_app_eng = {

                "chart": {
                    "caption": "Apparent Energy",
                    "xaxisname": "X-axis",
                    "yaxisname": "Y-axis",
                    "numbersuffix": "KVAhr",
                    "theme": "ocean",
                    "paletteColors": "#ff0000 ,#FFFF00,#0000FF",
                    "showvalues": "0",
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
            this.dataSource_react_eng = {

                "chart": {
                    "caption": "Reactive Energy",
                    "xaxisname": "X-axis",
                    "yaxisname": "Y-axis",
                    "theme": "ocean",
                    "numbersuffix": "KVARhr",
                    "paletteColors": "#ff0000 ,#FFFF00,#0000FF",
                    "showvalues": "0",
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
                const devicetype = "PWR";
                var payload = JSON.parse(message["text"])["d"];
                if (payload.id === "2") {
                    console.log(payload.type);
                    if (payload.type === devicetype) {
                        console.log('----------------------------------');
                        console.log('2nd pass');
                        console.log('----------------------------------');

                        //device["data"] = payload;
                        this.updateData_act_pwr_A(payload['1']);
                        this.updateData_act_pwr_B(payload['2']);
                        this.updateData_act_pwr_C(payload['3']);
                        this.updateData_app_pwr_A(payload['4']);
                        this.updateData_app_pwr_B(payload['5']);
                        this.updateData_app_pwr_C(payload['6']);
                        this.updateData_react_pwr_A(payload['7']);
                        this.updateData_react_pwr_B(payload['8']);
                        this.updateData_react_pwr_C(payload['9']);
                        this.updateData_act_eng_A(payload['10']);
                        this.updateData_act_eng_B(payload['11']);
                        this.updateData_act_eng_C(payload['12']);
                        this.updateData_app_eng_A(payload['13']);
                        this.updateData_app_eng_B(payload['14']);
                        this.updateData_app_eng_C(payload['15']);
                        this.updateData_react_eng_A(payload['16']);
                        this.updateData_react_eng_B(payload['17']);
                        this.updateData_react_eng_C(payload['18']);

                        // text
                        this.Data_1_act_A = (payload['1']);
                        this.Data_1_act_B = (payload['2']);
                        this.Data_1_act_C = (payload['3']);
                        this.Data_1_app_A = (payload['4']);
                        this.Data_1_app_B = (payload['5']);
                        this.Data_1_app_C = (payload['6']);
                        this.Data_1_react_A = (payload['7']);
                        this.Data_1_react_B = (payload['8']);
                        this.Data_1_react_C = (payload['9']);
                        this.Data_1_act_eng_A = (payload['10']);
                        this.Data_1_act_eng_B = (payload['11']);
                        this.Data_1_act_eng_C = (payload['12']);
                        this.Data_1_app_eng_A = (payload['13']);
                        this.Data_1_app_eng_B = (payload['14']);
                        this.Data_1_app_eng_C = (payload['15']);
                        this.Data_1_react_eng_A = (payload['16']);
                        this.Data_1_react_eng_B = (payload['17']);
                        this.Data_1_react_eng_C = (payload['18']);
                    }
                    if (payload.type === "HRMVA") {

                        //    //device["data"] = payload;
                        //    this.updateData_react_eng_A(payload['2']);
                        //    this.updateData_react_eng_A(payload['3']);
                        //    this.updateData_react_eng_A(payload['4']);
                        //    this.updateData_react_eng_A(payload['5']);
                        //    this.updateData_react_eng_A(payload['6']);

                    }
                    if (payload.type === "HRMVB") {

                        //    //device["data"] = payload;
                        //    this.updateData_react_eng_B(payload['2']);
                        //    this.updateData_react_eng_B(payload['3']);
                        //    this.updateData_react_eng_B(payload['4']);
                        //    this.updateData_react_eng_B(payload['5']);
                        //    this.updateData_react_eng_B(payload['6']);

                    }
                    if (payload.type === "HRMVC") {

                        //   // device["data"] = payload;
                        //    this.updateData_react_eng_C(payload['2']);
                        //    this.updateData_react_eng_C(payload['3']);
                        //    this.updateData_react_eng_C(payload['4']);
                        //    this.updateData_react_eng_C(payload['5']);
                        //    this.updateData_react_eng_C(payload['6']);

                    }
                    if (payload.type === "HRMIA") {

                        //   // device["data"] = payload;
                        //    this.updateData_har_curr_A(payload['2']);
                        //    this.updateData_har_curr_A(payload['3']);
                        //    this.updateData_har_curr_A(payload['4']);
                        //    this.updateData_har_curr_A(payload['5']);
                        //    this.updateData_har_curr_A(payload['6']);

                    }
                    if (payload.type === "HRMIB") {

                        //   // device["data"] = payload;
                        //    this.updateData_har_curr_B(payload['2']);
                        //    this.updateData_har_curr_B(payload['3']);
                        //    this.updateData_har_curr_B(payload['4']);
                        //    this.updateData_har_curr_B(payload['5']);
                        //    this.updateData_har_curr_B(payload['6']);

                    }
                    if (payload.type === "HRMIC") {

                        // device["data"] = payload;
                        //    this.updateData_har_curr_C(payload['2']);
                        //    this.updateData_har_curr_C(payload['3']);
                        //    this.updateData_har_curr_C(payload['4']);
                        //    this.updateData_har_curr_C(payload['5']);
                        //    this.updateData_har_curr_C(payload['6']);

                    }
                    if (payload.type === "HRMIN") {

                        // device["data"] = payload;
                        //this.updateData_har_curr_N(payload['2']);
                        //this.updateData_har_curr_N(payload['3']);
                        //this.updateData_har_curr_N(payload['4']);
                        //this.updateData_har_curr_N(payload['5']);
                        //this.updateData_har_curr_N(payload['6']);

                    }

                }

                //updateData_react_eng_B

                // this.updateData_volt_A(payload['1']);
                // this.updateData_volt_B(payload['2']);
                // this.updateData_volt_C(payload['C']);
                //this.updateData_curr_D(payload['4']);
                //this.updateData_curr_E(payload['5']);
                //this.updateData_curr_F(payload['6']);
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
                //console.log("Devices:", devices);

                if (pagination) {
                    if (pagination === "next") this.currentPage = this.currentPage + 1;
                    else if (pagination === "prev") this.currentPage = this.currentPage - 1;
                } else {
                    this.currentPage = 1;
                }

                this.devices = devices["results"];
                //console.log(devices);

                this.totalDevices = devices["meta"].total_rows;
                this.totalPages = Math.ceil(this.totalDevices / this.limit);

                this.bookmark = devices["bookmark"];
                this.bookmarks[this.currentPage] = devices["bookmark"];

                // Get last cached event for all devices loaded
                var index = 0;
                for (let device of this.devices) {
                    this.ibmIoTP.getLastCachedEvent(device.deviceId).then(
                        eventData => {
                            // console.log("Event:", atob(eventData["payload"]));

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

    updateData_act_pwr_A(value) {
        if (this.count <= 11) {
            this.dataSource_active_pwr.dataset[0]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_active_pwr.dataset[0]['data'][this.counter].value = this.dataSource_active_pwr.dataset[0]['data'][this.counter + 1].value;
            }
            this.dataSource_active_pwr.dataset[0]['data'][11].value = value;
        }
    }
    updateData_act_pwr_B(value) {
        if (this.count <= 11) {
            this.dataSource_active_pwr.dataset[1]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_active_pwr.dataset[1]['data'][this.counter].value = this.dataSource_active_pwr.dataset[1]['data'][this.counter + 1].value;
            }
            this.dataSource_active_pwr.dataset[1]['data'][11].value = value;
        }
    }
    updateData_act_pwr_C(value) {
        if (this.count <= 11) {
            this.dataSource_active_pwr.dataset[2]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_active_pwr.dataset[2]['data'][this.counter].value = this.dataSource_active_pwr.dataset[2]['data'][this.counter + 1].value;
            }
            this.dataSource_active_pwr.dataset[2]['data'][11].value = value;
        }
    }
    updateData_app_pwr_A(value) {
        if (this.count <= 11) {
            this.dataSource_app_pwr.dataset[0]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_app_pwr.dataset[0]['data'][this.counter].value = this.dataSource_app_pwr.dataset[0]['data'][this.counter + 1].value;
            }
            this.dataSource_app_pwr.dataset[0]['data'][11].value = value;
        }
    }
    updateData_app_pwr_B(value) {
        if (this.count <= 11) {
            this.dataSource_app_pwr.dataset[1]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_app_pwr.dataset[1]['data'][this.counter].value = this.dataSource_app_pwr.dataset[1]['data'][this.counter + 1].value;
            }
            this.dataSource_app_pwr.dataset[1]['data'][11].value = value;
        }
    }
    updateData_app_pwr_C(value) {
        if (this.count <= 11) {
            this.dataSource_app_pwr.dataset[2]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_app_pwr.dataset[2]['data'][this.counter].value = this.dataSource_app_pwr.dataset[2]['data'][this.counter + 1].value;
            }
            this.dataSource_app_pwr.dataset[2]['data'][11].value = value;
        }
    }

    updateData_react_pwr_A(value) {
        if (this.count <= 11) {
            this.dataSource_react_pwr.dataset[0]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_react_pwr.dataset[0]['data'][this.counter].value = this.dataSource_react_pwr.dataset[0]['data'][this.counter + 1].value;
            }
            this.dataSource_react_pwr.dataset[0]['data'][11].value = value;
        }
    }
    updateData_react_pwr_B(value) {
        if (this.count <= 11) {
            this.dataSource_react_pwr.dataset[1]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_react_pwr.dataset[1]['data'][this.counter].value = this.dataSource_react_pwr.dataset[1]['data'][this.counter + 1].value;
            }
            this.dataSource_react_pwr.dataset[1]['data'][11].value = value;
        }
    }
    updateData_react_pwr_C(value) {
        if (this.count <= 11) {
            this.dataSource_react_pwr.dataset[2]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_react_pwr.dataset[2]['data'][this.counter].value = this.dataSource_react_pwr.dataset[2]['data'][this.counter + 1].value;
            }
            this.dataSource_react_pwr.dataset[2]['data'][11].value = value;
        }
    }
    updateData_act_eng_A(value) {
        if (this.count <= 11) {
            this.dataSource_act_eng.dataset[0]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_act_eng.dataset[0]['data'][this.counter].value = this.dataSource_act_eng.dataset[0]['data'][this.counter + 1].value;
            }
            this.dataSource_act_eng.dataset[0]['data'][11].value = value;
        }
    }
    updateData_act_eng_B(value) {
        if (this.count <= 11) {
            this.dataSource_act_eng.dataset[1]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_act_eng.dataset[1]['data'][this.counter].value = this.dataSource_act_eng.dataset[1]['data'][this.counter + 1].value;
            }
            this.dataSource_act_eng.dataset[1]['data'][11].value = value;
        }
    }
    updateData_act_eng_C(value) {
        if (this.count <= 11) {
            this.dataSource_act_eng.dataset[2]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_act_eng.dataset[2]['data'][this.counter].value = this.dataSource_act_eng.dataset[2]['data'][this.counter + 1].value;
            }
            this.dataSource_act_eng.dataset[2]['data'][11].value = value;
        }
    }
    updateData_app_eng_A(value) {
        if (this.count <= 11) {
            this.dataSource_app_eng.dataset[0]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_app_eng.dataset[0]['data'][this.counter].value = this.dataSource_app_eng.dataset[0]['data'][this.counter + 1].value;
            }
            this.dataSource_app_eng.dataset[0]['data'][11].value = value;
        }
    }
    updateData_app_eng_B(value) {
        if (this.count <= 11) {
            this.dataSource_app_eng.dataset[1]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_app_eng.dataset[1]['data'][this.counter].value = this.dataSource_app_eng.dataset[1]['data'][this.counter + 1].value;
            }
            this.dataSource_app_eng.dataset[1]['data'][11].value = value;
        }
    }
    updateData_app_eng_C(value) {
        if (this.count <= 11) {
            this.dataSource_app_eng.dataset[2]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_app_eng.dataset[2]['data'][this.counter].value = this.dataSource_app_eng.dataset[2]['data'][this.counter + 1].value;
            }
            this.dataSource_app_eng.dataset[2]['data'][11].value = value;
        }
    }

    //Harmonics//////////////////////////////////////////
    updateData_react_eng_A(value) {
        if (this.count <= 11) {
            this.dataSource_react_eng.dataset[0]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_react_eng.dataset[0]['data'][this.counter].value = this.dataSource_react_eng.dataset[0]['data'][this.counter + 1].value;
            }
            this.dataSource_react_eng.dataset[0]['data'][11].value = value;
        }
    }
    updateData_react_eng_B(value) {
        if (this.count <= 11) {
            this.dataSource_react_eng.dataset[1]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_react_eng.dataset[1]['data'][this.counter].value = this.dataSource_react_eng.dataset[1]['data'][this.counter + 1].value;
            }
            this.dataSource_react_eng.dataset[1]['data'][11].value = value;
        }
    }
    updateData_react_eng_C(value) {
        if (this.count <= 11) {
            this.dataSource_react_eng.dataset[2]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_react_eng.dataset[2]['data'][this.counter].value = this.dataSource_react_eng.dataset[2]['data'][this.counter + 1].value;
            }
            this.dataSource_react_eng.dataset[2]['data'][11].value = value;
        }
    }








};