import { Component, OnInit } from '@angular/core';
import { IBMIoTPService } from '../../services/iotp/ibmIoTP.service';
import { LiveDataService } from '../../services/livedata/liveData.service';
import { apiCallServer } from '../../services/apicallserver/apiCallServer.service';


// Carbon Design Framework
import { DataTable } from 'carbon-components';
import { Checkbox } from 'carbon-components';

@Component({
    templateUrl: './devices.component.html',
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

export class DevicesComponent implements OnInit {
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
    type = 'mscombi2d';
    type1 = 'column2d';
    dataFormat = 'json';
    bgColor = "#393d7c";
    dataSource_VRMS_A_volt;
    dataSource_VRMS_B_volt;
    dataSource_VRMS_C_volt
    dataSource_VRMS_A_curr;
    dataSource_VRMS_B_curr;
    dataSource_VRMS_C_curr;
    dataSource_VRMS_neu_curr;
    dataSource_THD_1_volt;
    dataSource_THD_1_curr;
    dataSource_THD_neu_curr;
    dataSource_power;
    dataSource_har_curr;
    dataSource_har_volt;

    //Variables
    Data_1_volt_A: any;
    Data_1_volt_B: any;
    Data_1_volt_C: any;
    Data_1_curr_A: any;
    Data_1_curr_B: any;
    Data_1_curr_C: any;
    Data_1_neu_curr: any;
    Data_1_THD_volt_A: any;
    Data_1_THD_volt_B: any;
    Data_1_THD_volt_C: any;
    Data_1_THD_curr_A: any;
    Data_1_THD_curr_B: any;
    Data_1_THD_curr_C: any;
    Data_1_THD_neu_curr: any;
    Data_1_power_A: any;
    Data_1_power_B: any;
    Data_1_power_C: any;


    count = 0;
    counter = 0;
    var_1_time: any;
    var_2_time: any;
    var_1_interval: any;
    var_2_interval: any;
    datasource;

    // Live Data
    connection;
    liveData = {};
    messages = [];
    message;
    mqttStatus: boolean = false;
    liveDataSubscribedOnInit: boolean = false;
    var1: any;
    responseData: any;
    gotData: any;

    constructor(private ibmIoTP: IBMIoTPService, private liveDataService: LiveDataService, public authService: apiCallServer) {
        this.dataSource_VRMS_A_volt = {

            "chart": {
                "caption": "Voltage Phase A",
                "xaxisname": "X-axis",
                "yaxisname": "Y-axis",
                "numbersuffix": "V",
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
                "seriesname": "Device A",
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
                "seriesname": "Device B",
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
                "seriesname": "Device C",
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
            this.dataSource_VRMS_B_volt = {

                "chart": {
                    "caption": "Voltage Phase B",
                    "xaxisname": "X-axis",
                    "yaxisname": "Y-axis",
                    "numbersuffix": "V",
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
                    "seriesname": "Device A",
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
                    "seriesname": "Device B",
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
                    "seriesname": "Device C",
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
            this.dataSource_VRMS_C_volt = {

                "chart": {
                    "caption": "Voltage Phase C",
                    "xaxisname": "X-axis",
                    "yaxisname": "Y-axis",
                    "numbersuffix": "V",
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
                    "seriesname": "Device A",
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
                    "seriesname": "Device B",
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
                    "seriesname": "Device C",
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

            this.dataSource_VRMS_A_curr = {

                "chart": {
                    "caption": "Current Phase A",
                    "xaxisname": "X-axis",
                    "yaxisname": "Y-axis",
                    "numbersuffix": "A",
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
                    "seriesname": "Device A",
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
                    "seriesname": "Device B",
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
                    "seriesname": "Device C",
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
            this.dataSource_VRMS_B_curr = {

                "chart": {
                    "caption": "Current Phase B",
                    "xaxisname": "X-axis",
                    "yaxisname": "Y-axis",
                    "numbersuffix": "A",
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
                    "seriesname": "Device A",
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
                    "seriesname": "Device B",
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
                    "seriesname": "Device C",
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
            this.dataSource_VRMS_C_curr = {

                "chart": {
                    "caption": "Current Phase C",
                    "xaxisname": "X-axis",
                    "yaxisname": "Y-axis",
                    "numbersuffix": "A",
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
                    "seriesname": "Device A",
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
                    "seriesname": "Device B",
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
                    "seriesname": "Device C",
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
            this.dataSource_VRMS_neu_curr = {

                "chart": {
                    "caption": "Neutral Current",
                    "xaxisname": "X-axis",
                    "yaxisname": "Y-axis",
                    "numbersuffix": "A",
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
                    "seriesname": "Device A",
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
                }

                ]
            },

            this.dataSource_THD_1_volt = {

                "chart": {
                    "caption": "THD Voltage",
                    "xaxisname": "X-axis",
                    "yaxisname": "Y-axis",
                    "numbersuffix": "V",
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
                    "seriesname": "Device A",
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
                    "seriesname": "Device B",
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
                    "seriesname": "Device C",
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

            this.dataSource_THD_1_curr = {

                "chart": {
                    "caption": "THD Current",
                    "xaxisname": "X-axis",
                    "yaxisname": "Y-axis",
                    "numbersuffix": "A",
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
                    "seriesname": "Device A",
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
                    "seriesname": "Device B",
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
                    "seriesname": "Device C",
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
            this.dataSource_THD_neu_curr = {

                "chart": {
                    "caption": "THD Neutral Current",
                    "xaxisname": "X-axis",
                    "yaxisname": "Y-axis",
                    "numbersuffix": "A",
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
                    "seriesname": "Device A",
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
                    "seriesname": "Device B",
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
                    "seriesname": "Device C",
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
            this.dataSource_power = {

                "chart": {
                    "caption": "Power",
                    "xaxisname": "X-axis",
                    "yaxisname": "Y-axis",
                    "numbersuffix": "KWh",
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
                    "seriesname": "Device A",
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
                    "seriesname": "Device B",
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
                    "seriesname": "Device C",
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
            this.dataSource_har_volt = {

                "chart": {
                    "caption": "Harmonic Voltage",
                    "xaxisname": "X-axis",
                    "yaxisname": "Y-axis",
                    "theme": "ocean",
                    "paletteColors": "#ff0000 ,#FFFF00,#0000FF",
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
                    "seriesname": "Device A",
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
                    "seriesname": "Device B",
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
                    "seriesname": "Device C",
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
            this.dataSource_har_curr = {

                "chart": {
                    "caption": "Harmonic Current",
                    "xaxisname": "X-axis",
                    "yaxisname": "Y-axis",
                    "theme": "ocean",
                    "paletteColors": "#ff0000 ,#FFFF00,#0000FF,#008000",
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
                    "seriesname": "Device A",
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
                    "seriesname": "Device B",
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
                    "seriesname": "Device C",
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
                    "seriesname": "Phase N",
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

                console.log("TEXT", message["text"]);

                var payload = JSON.parse(message["text"])["d"];


                if (payload.id === "1") {

                    //device["data"] = payload;


                    // text
                    this.updateData_1_volt_A(payload['1']);
                    this.updateData_1_volt_B(payload['2']);
                    this.updateData_1_volt_C(payload['3']);
                    this.updateData_1_curr_A(payload['4']);
                    this.updateData_1_curr_B(payload['5']);
                    this.updateData_1_curr_C(payload['6']);
                }
                if (payload.id == "2") {

                    //console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
                    //this.sendDataServer(payload);
                    //console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');

                   console.log("--------------------");
                   console.log(payload);
                   console.log("------------------")
                }
                if (payload.id === "3") {


                    //    device.data = payload;


                    // text
                    this.updateData_3_volt_A(payload['1']);
                    this.updateData_3_volt_B(payload['2']);
                    this.updateData_3_volt_C(payload['3']);
                    this.updateData_3_curr_A(payload['4']);
                    this.updateData_3_curr_B(payload['5']);
                    this.updateData_3_curr_C(payload['6']);


                }

                //updateData_har_volt_B

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

    ////////////////////////////////Device A

    updateData_1_volt_A(value) {
        if (this.count <= 11) {
            this.dataSource_VRMS_A_volt.dataset[0]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_VRMS_A_volt.dataset[0]['data'][this.counter].value = this.dataSource_VRMS_A_volt.dataset[0]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_A_volt.dataset[0]['data'][11].value = value;
        }
    }
    updateData_2_volt_A(value) {
        if (this.count <= 11) {
            this.dataSource_VRMS_A_volt.dataset[1]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_VRMS_A_volt.dataset[1]['data'][this.counter].value = this.dataSource_VRMS_A_volt.dataset[1]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_A_volt.dataset[1]['data'][11].value = value;
        }
    }
    updateData_3_volt_A(value) {
        if (this.count <= 11) {
            this.dataSource_VRMS_A_volt.dataset[2]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_VRMS_A_volt.dataset[2]['data'][this.counter].value = this.dataSource_VRMS_A_volt.dataset[2]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_A_volt.dataset[2]['data'][11].value = value;
        }
    }
    updateData_1_volt_B(value) {
        if (this.count <= 11) {
            this.dataSource_VRMS_B_volt.dataset[0]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_VRMS_B_volt.dataset[0]['data'][this.counter].value = this.dataSource_VRMS_B_volt.dataset[0]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_B_volt.dataset[0]['data'][11].value = value;
        }
    }
    updateData_2_volt_B(value) {
        if (this.count <= 11) {
            this.dataSource_VRMS_B_volt.dataset[1]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_VRMS_B_volt.dataset[1]['data'][this.counter].value = this.dataSource_VRMS_B_volt.dataset[1]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_B_volt.dataset[1]['data'][11].value = value;
        }
    }
    updateData_3_volt_B(value) {
        if (this.count <= 11) {
            this.dataSource_VRMS_B_volt.dataset[2]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_VRMS_B_volt.dataset[2]['data'][this.counter].value = this.dataSource_VRMS_B_volt.dataset[2]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_B_volt.dataset[2]['data'][11].value = value;
        }
    }
    updateData_1_volt_C(value) {
        if (this.count <= 11) {
            this.dataSource_VRMS_C_volt.dataset[0]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_VRMS_C_volt.dataset[0]['data'][this.counter].value = this.dataSource_VRMS_C_volt.dataset[0]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_C_volt.dataset[0]['data'][11].value = value;
        }
    }
    updateData_2_volt_C(value) {
        if (this.count <= 11) {
            this.dataSource_VRMS_C_volt.dataset[1]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_VRMS_C_volt.dataset[1]['data'][this.counter].value = this.dataSource_VRMS_C_volt.dataset[1]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_C_volt.dataset[1]['data'][11].value = value;
        }
    }
    updateData_3_volt_C(value) {
        if (this.count <= 11) {
            this.dataSource_VRMS_C_volt.dataset[2]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_VRMS_C_volt.dataset[2]['data'][this.counter].value = this.dataSource_VRMS_C_volt.dataset[2]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_C_volt.dataset[2]['data'][11].value = value;
        }
    }
    updateData_1_curr_A(value) {
        if (this.count <= 11) {
            this.dataSource_VRMS_A_curr.dataset[0]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_VRMS_A_curr.dataset[0]['data'][this.counter].value = this.dataSource_VRMS_A_curr.dataset[0]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_A_curr.dataset[0]['data'][11].value = value;
        }
    }
    updateData_2_curr_A(value) {
        if (this.count <= 11) {
            this.dataSource_VRMS_A_curr.dataset[1]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_VRMS_A_curr.dataset[1]['data'][this.counter].value = this.dataSource_VRMS_A_curr.dataset[1]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_A_curr.dataset[1]['data'][11].value = value;
        }
    }
    updateData_3_curr_A(value) {
        if (this.count <= 11) {
            this.dataSource_VRMS_A_curr.dataset[2]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_VRMS_A_curr.dataset[2]['data'][this.counter].value = this.dataSource_VRMS_A_curr.dataset[2]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_A_curr.dataset[2]['data'][11].value = value;
        }
    }
    updateData_1_curr_B(value) {
        if (this.count <= 11) {
            this.dataSource_VRMS_A_curr.dataset[0]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_VRMS_A_curr.dataset[0]['data'][this.counter].value = this.dataSource_VRMS_A_curr.dataset[0]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_A_curr.dataset[0]['data'][11].value = value;
        }
    }
    updateData_2_curr_B(value) {
        if (this.count <= 11) {
            this.dataSource_VRMS_B_curr.dataset[1]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_VRMS_B_curr.dataset[1]['data'][this.counter].value = this.dataSource_VRMS_B_curr.dataset[1]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_B_curr.dataset[1]['data'][11].value = value;
        }
    }
    updateData_3_curr_B(value) {
        if (this.count <= 11) {
            this.dataSource_VRMS_C_curr.dataset[1]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_VRMS_C_curr.dataset[1]['data'][this.counter].value = this.dataSource_VRMS_C_curr.dataset[1]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_C_curr.dataset[1]['data'][11].value = value;
        }
    }
    updateData_1_curr_C(value) {
        if (this.count <= 11) {
            this.dataSource_VRMS_A_curr.dataset[0]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_VRMS_A_curr.dataset[0]['data'][this.counter].value = this.dataSource_VRMS_A_curr.dataset[0]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_A_curr.dataset[0]['data'][11].value = value;
        }
    }
    updateData_2_curr_C(value) {
        if (this.count <= 11) {
            this.dataSource_VRMS_B_curr.dataset[1]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_VRMS_B_curr.dataset[1]['data'][this.counter].value = this.dataSource_VRMS_B_curr.dataset[1]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_B_curr.dataset[1]['data'][11].value = value;
        }
    }
    updateData_3_curr_C(value) {
        if (this.count <= 11) {
            this.dataSource_VRMS_C_curr.dataset[2]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_VRMS_C_curr.dataset[2]['data'][this.counter].value = this.dataSource_VRMS_C_curr.dataset[2]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_C_curr.dataset[2]['data'][11].value = value;
        }
    }
    updateData_1_neu_curr(value) {
        if (this.count <= 11) {
            this.dataSource_VRMS_neu_curr.dataset[0]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_VRMS_neu_curr.dataset[0]['data'][this.counter].value = this.dataSource_VRMS_neu_curr.dataset[0]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_neu_curr.dataset[0]['data'][11].value = value;
        }
    }
    updateData_1_THD_volt_A(value) {
        if (this.count <= 11) {
            this.dataSource_THD_1_volt.dataset[0]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_THD_1_volt.dataset[0]['data'][this.counter].value = this.dataSource_THD_1_volt.dataset[0]['data'][this.counter + 1].value;
            }
            this.dataSource_THD_1_volt.dataset[0]['data'][11].value = value;
        }
    }
    updateData_1_THD_volt_B(value) {
        if (this.count <= 11) {
            this.dataSource_THD_1_volt.dataset[1]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_THD_1_volt.dataset[1]['data'][this.counter].value = this.dataSource_THD_1_volt.dataset[1]['data'][this.counter + 1].value;
            }
            this.dataSource_THD_1_volt.dataset[1]['data'][11].value = value;
        }
    }
    updateData_1_THD_volt_C(value) {
        if (this.count <= 11) {
            this.dataSource_THD_1_volt.dataset[2]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_THD_1_volt.dataset[2]['data'][this.counter].value = this.dataSource_THD_1_volt.dataset[2]['data'][this.counter + 1].value;
            }
            this.dataSource_THD_1_volt.dataset[2]['data'][11].value = value;
        }
    }
    updateData_1_THD_curr_A(value) {
        if (this.count <= 11) {
            this.dataSource_THD_1_curr.dataset[0]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_THD_1_curr.dataset[0]['data'][this.counter].value = this.dataSource_THD_1_curr.dataset[0]['data'][this.counter + 1].value;
            }
            this.dataSource_THD_1_curr.dataset[0]['data'][11].value = value;
        }
    }
    updateData_1_THD_curr_B(value) {
        if (this.count <= 11) {
            this.dataSource_THD_1_curr.dataset[1]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_THD_1_curr.dataset[1]['data'][this.counter].value = this.dataSource_THD_1_curr.dataset[1]['data'][this.counter + 1].value;
            }
            this.dataSource_THD_1_curr.dataset[1]['data'][11].value = value;
        }
    }
    updateData_1_THD_curr_C(value) {
        if (this.count <= 11) {
            this.dataSource_THD_1_curr.dataset[2]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_THD_1_curr.dataset[2]['data'][this.counter].value = this.dataSource_THD_1_curr.dataset[2]['data'][this.counter + 1].value;
            }
            this.dataSource_THD_1_curr.dataset[2]['data'][11].value = value;
        }
    }
    updateData_1_THD_neu_curr(value) {
        if (this.count <= 11) {
            this.dataSource_THD_neu_curr.dataset[0]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_THD_neu_curr.dataset[0]['data'][this.counter].value = this.dataSource_THD_neu_curr.dataset[0]['data'][this.counter + 1].value;
            }
            this.dataSource_THD_neu_curr.dataset[0]['data'][11].value = value;
        }
    }

    updateData_1_power_A(value) {
        if (this.count <= 11) {
            this.dataSource_power.dataset[0]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_power.dataset[0]['data'][this.counter].value = this.dataSource_power.dataset[0]['data'][this.counter + 1].value;
            }
            this.dataSource_power.dataset[0]['data'][11].value = value;
        }
    }
    updateData_1_power_B(value) {
        if (this.count <= 11) {
            this.dataSource_power.dataset[1]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_power.dataset[1]['data'][this.counter].value = this.dataSource_power.dataset[1]['data'][this.counter + 1].value;
            }
            this.dataSource_power.dataset[1]['data'][11].value = value;
        }
    }
    updateData_1_power_C(value) {
        if (this.count <= 11) {
            this.dataSource_power.dataset[2]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_power.dataset[2]['data'][this.counter].value = this.dataSource_power.dataset[2]['data'][this.counter + 1].value;
            }
            this.dataSource_power.dataset[2]['data'][11].value = value;
        }
    }

    //Harmonics//////////////////////////////////////////
    updateData_har_volt_A(value) {
        if (this.count <= 11) {
            this.dataSource_har_volt.dataset[0]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_har_volt.dataset[0]['data'][this.counter].value = this.dataSource_har_volt.dataset[0]['data'][this.counter + 1].value;
            }
            this.dataSource_har_volt.dataset[0]['data'][11].value = value;
        }
    }
    updateData_har_volt_B(value) {
        if (this.count <= 11) {
            this.dataSource_har_volt.dataset[1]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_har_volt.dataset[1]['data'][this.counter].value = this.dataSource_har_volt.dataset[1]['data'][this.counter + 1].value;
            }
            this.dataSource_har_volt.dataset[1]['data'][11].value = value;
        }
    }
    updateData_har_volt_C(value) {
        if (this.count <= 11) {
            this.dataSource_har_volt.dataset[2]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_har_volt.dataset[2]['data'][this.counter].value = this.dataSource_har_volt.dataset[2]['data'][this.counter + 1].value;
            }
            this.dataSource_har_volt.dataset[2]['data'][11].value = value;
        }
    }

    updateData_har_curr_A(value) {
        if (this.count <= 11) {
            this.dataSource_har_curr.dataset[0]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_har_curr.dataset[0]['data'][this.counter].value = this.dataSource_har_curr.dataset[0]['data'][this.counter + 1].value;
            }
            this.dataSource_har_curr.dataset[0]['data'][11].value = value;
        }
    }
    updateData_har_curr_B(value) {
        if (this.count <= 11) {
            this.dataSource_har_curr.dataset[1]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_har_curr.dataset[1]['data'][this.counter].value = this.dataSource_har_curr.dataset[1]['data'][this.counter + 1].value;
            }
            this.dataSource_har_curr.dataset[1]['data'][11].value = value;
        }
    }
    updateData_har_curr_C(value) {
        if (this.count <= 11) {
            this.dataSource_har_curr.dataset[2]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_har_curr.dataset[2]['data'][this.counter].value = this.dataSource_har_curr.dataset[2]['data'][this.counter + 1].value;
            }
            this.dataSource_har_curr.dataset[2]['data'][11].value = value;
        }
    }
    updateData_har_curr_N(value) {
        if (this.count <= 11) {
            this.dataSource_har_curr.dataset[3]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_har_curr.dataset[3]['data'][this.counter].value = this.dataSource_har_curr.dataset[3]['data'][this.counter + 1].value;
            }
            this.dataSource_har_curr.dataset[3]['data'][11].value = value;
        }
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