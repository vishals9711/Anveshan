import { Component, OnInit } from '@angular/core';
import { IBMIoTPService } from '../../services/iotp/ibmIoTP.service';
import { LiveDataService } from '../../services/livedata/liveData.service';
import { apiCallServer } from '../../services/apicallserver/apiCallServer.service';



// Carbon Design Framework
import { DataTable } from 'carbon-components';
import { Checkbox } from 'carbon-components';

@Component({
    templateUrl: './grida.component.html',
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

export class gridaiComponent implements OnInit {
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
    type1 = 'mscolumn2d';
    dataFormat = 'json';
    bgColor = "#393d7c";
    dataSource_VRMS_1_volt;
    dataSource_VRMS_1_curr;
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
    Data_1_power_A_max: number = 0;
    Data_1_power_B_max = 0;
    Data_1_power_C_max = 0;
    Data_1_acc_x: any;
    Data_1_acc_y: any;
    Data_1_acc_z: any;
    Data_1_temp: any;
    Data_1_oil_lvl: any;
    Data_1_cool_lvl: any;


    count = 0;
    counter = 0;
    var_1_time: any;
    var_2_time: any;
    var_1_interval: any;
    var_2_interval: any;
    numb_var: number = 0;

    // Live Data
    connection;
    liveData = {};
    messages = [];
    message;
    mqttStatus: boolean = false;
    liveDataSubscribedOnInit: boolean = false;
    var1: any;
    var_time: any;
    var_time1: any;
    responseData: any;
    gotData: any;

    constructor(private ibmIoTP: IBMIoTPService, private liveDataService: LiveDataService,public authService: apiCallServer) {
            this.dataSource_VRMS_1_volt = {

            "chart": {
                "caption": "Voltage",
                "xaxisname": "X-axis",
                "yaxisname": "Y-axis",
                "numbersuffix": "V",
                "theme": "ocean",
                "showValues": "0",
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
                    "numbersuffix": "A",
                    "theme": "ocean",
                    "showValues": "0",
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
            this.dataSource_VRMS_neu_curr = {

                "chart": {
                    "caption": "Neutral Current",
                    "xaxisname": "X-axis",
                    "yaxisname": "Y-axis",
                    "numbersuffix": "A",
                    "theme": "ocean",
                    "showValues": "0",
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
                }

                ]
            },

            this.dataSource_THD_1_volt = {

                "chart": {
                    "caption": "THD Voltage",
                    "xaxisname": "X-axis",
                    "yaxisname": "Y-axis",
                    "numbersuffix": "V",
                    "theme": "ocean",
                    "showValues": "0",
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

            this.dataSource_THD_1_curr = {

                "chart": {
                    "caption": "THD Current",
                    "xaxisname": "X-axis",
                    "yaxisname": "Y-axis",
                    "numbersuffix": "A",
                    "theme": "ocean",
                    "showValues": "0",
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
            this.dataSource_THD_neu_curr = {

                "chart": {
                    "caption": "THD Neutral Current",
                    "xaxisname": "X-axis",
                    "yaxisname": "Y-axis",
                    "numbersuffix": "A",
                    "theme": "ocean",
                    "showValues": "0",
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
                    "seriesname": "Neutral",
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
            this.dataSource_power = {

                "chart": {
                    "caption": "Power",
                    "xaxisname": "X-axis",
                    "yaxisname": "Y-axis",
                    "numbersuffix": "W",
                    "theme": "ocean",
                    "showValues": "0",
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
            this.dataSource_har_volt = {

                "chart": {
                    "caption": "Harmonic Voltage",
                    "xaxisname": "X-axis",
                    "yaxisname": "Y-axis",
                    "theme": "ocean",
                    "numbersuffix": "V",
                    "showValues": "0",
                    "paletteColors": "#ff0000 ,#FFFF00,#0000FF",
                },
                "categories": [{
                    "category": [

                        {
                            "label": "1"
                        },

                        {
                            "label": "3"
                        },


                        {
                            "label": "5"
                        },



                        {
                            "label": "7"
                        },



                        {
                            "label": "9"
                        },



                        {
                            "label": "12"
                        },

                        {
                            "label": "13"
                        },


                        {
                            "label": "15"
                        },



                        {
                            "label": "17"
                        },



                        {
                            "label": "19"
                        },


                        {
                            "label": "21"
                        },

                        {
                            "label": "23"
                        },


                        {
                            "label": "25"
                        },



                        {
                            "label": "27"
                        },



                        {
                            "label": "29"
                        },



                        {
                            "label": "31"
                        },

                        {
                            "label": "33"
                        },


                        {
                            "label": "35"
                        },


                        {
                            "label": "37"
                        },



                        {
                            "label": "39"
                        },


                        {
                            "label": "41"
                        },

                        {
                            "label": "43"
                        },

                        {
                            "label": "45"
                        },
                        {
                            "label": "47"
                        },
                        {
                            "label": "49"
                        },
                        {
                            "label": "51"
                        },

                        {
                            "label": "53"
                        },
                        {
                            "label": "55"
                        },
                        {
                            "label": "57"
                        },
                        {
                            "label": "59"
                        },
                        {
                            "label": "61"
                        },
                        {
                            "label": "63"
                        },
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
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

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
                    }, {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    }, {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
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
                    }, {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    }, {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
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
                    "numbersuffix": "A",
                    "showValues": "0",
                    "paletteColors": "#ff0000 ,#FFFF00,#0000FF,#000000",
                },
                "categories": [{
                    "category": [

                        {
                            "label": "1"
                        },

                        {
                            "label": "3"
                        },


                        {
                            "label": "5"
                        },



                        {
                            "label": "7"
                        },



                        {
                            "label": "9"
                        },



                        {
                            "label": "12"
                        },

                        {
                            "label": "13"
                        },


                        {
                            "label": "15"
                        },



                        {
                            "label": "17"
                        },



                        {
                            "label": "19"
                        },


                        {
                            "label": "21"
                        },

                        {
                            "label": "23"
                        },


                        {
                            "label": "25"
                        },



                        {
                            "label": "27"
                        },



                        {
                            "label": "29"
                        },



                        {
                            "label": "31"
                        },

                        {
                            "label": "33"
                        },


                        {
                            "label": "35"
                        },


                        {
                            "label": "37"
                        },



                        {
                            "label": "39"
                        },


                        {
                            "label": "41"
                        },

                        {
                            "label": "43"
                        },

                        {
                            "label": "45"
                        },



                        {
                            "label": "47"
                        },


                        {
                            "label": "49"
                        },


                        {
                            "label": "51"
                        },

                        {
                            "label": "53"
                        },

                        {
                            "label": "55"
                        },



                        {
                            "label": "57"
                        },



                        {
                            "label": "59"
                        },
                        {
                            "label": "61"
                        },
                        {
                            "label": "63"
                        },
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
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    }, {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
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
                    }, {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    }, {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
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
                    }, {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    }, {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
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
                    }, {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    }, {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },
                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
                    },

                    {
                        "value": "0"
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


                var payload = JSON.parse(message["text"])["d"];
                this.sendDataServer(payload);

                if (payload.id === "2") {
                    if (payload.type === "VRMS") {
                        this.updateData_1_volt_A(payload['1']);
                        this.updateData_1_volt_B(payload['2']);
                        this.updateData_1_volt_C(payload['3']);
                        this.updateData_1_curr_A(payload['4']);
                        this.updateData_1_curr_B(payload['5']);
                        this.updateData_1_curr_C(payload['6']);
                        this.updateData_1_neu_curr(payload['7']);
                        this.updateData_1_THD_volt_A(payload['8']);
                        this.updateData_1_THD_volt_B(payload['9']);
                        this.updateData_1_THD_volt_C(payload['10']);
                        this.updateData_1_THD_curr_A(payload['11']);
                        this.updateData_1_THD_curr_B(payload['12']);
                        this.updateData_1_THD_curr_C(payload['13']);
                        this.updateData_1_THD_neu_curr(payload['14']);
                        this.updateData_1_power_A(payload['15']);
                        this.updateData_1_power_B(payload['16']);
                        this.updateData_1_power_C(payload['17']);
                        this.var_time = payload.timestamp;
                        this.var_time1 =  this.getTimeFromDate(this.var_time);
                        var myDate = new Date(this.var_time * 1000);
                        this.var_time1 = (myDate.toLocaleString());
                        this.updateData_time(this.var_time1);
                        // text Variables
                        this.Data_1_volt_A = (payload['1']);
                        this.Data_1_volt_B = (payload['2']);
                        this.Data_1_volt_C = (payload['3']);
                        this.Data_1_curr_A = (payload['4']);
                        this.Data_1_curr_B = (payload['5']);
                        this.Data_1_curr_C = (payload['6']);
                        this.Data_1_neu_curr = (payload['7']);
                        this.Data_1_THD_volt_A = (payload['8']);
                        this.Data_1_THD_volt_B = (payload['9']);
                        this.Data_1_THD_volt_C = (payload['10']);
                        this.Data_1_THD_curr_A = (payload['11']);
                        this.Data_1_THD_curr_B = (payload['12']);
                        this.Data_1_THD_curr_C = (payload['13']);
                        this.Data_1_THD_neu_curr = (payload['14']);
                        this.Data_1_power_A = (payload['15']);
                        this.Data_1_power_B = (payload['16']);
                        this.Data_1_power_C = (payload['17']);
                        if (this.Data_1_power_A > this.Data_1_power_A_max) {
                            this.Data_1_power_A_max = this.Data_1_power_A;
                        }
                        if (this.Data_1_power_B > this.Data_1_power_B_max) {
                            this.Data_1_power_B_max = this.Data_1_power_B;
                        }
                        if (this.Data_1_power_C > this.Data_1_power_C_max) {
                            this.Data_1_power_C_max = this.Data_1_power_C;
                        }

                    }
                    if (payload.type === "HRMVA") {
                        for (this.numb_var = 2; this.numb_var < 32; this.numb_var++) {


                            this.updateData_har_volt_A(payload[this.numb_var]);
                        }

                    }
                    if (payload.type === "HRMVB") {


                        for (this.numb_var = 2; this.numb_var < 32; this.numb_var++) {
                            this.updateData_har_volt_B(payload[this.numb_var]);

                        }

                    }
                    if (payload.type === "HRMVC") {


                        for (this.numb_var = 2; this.numb_var < 32; this.numb_var++) {
                            this.updateData_har_volt_C(payload[this.numb_var]);

                        }
                    }
                    if (payload.type === "HRMIA") {


                        for (this.numb_var = 2; this.numb_var < 32; this.numb_var++) {
                            this.updateData_har_curr_A(payload[this.numb_var]);

                        }


                    }
                    if (payload.type === "HRMIB") {


                        for (this.numb_var = 2; this.numb_var < 32; this.numb_var++) {
                            this.updateData_har_curr_B(payload[this.numb_var]);

                        }

                    }
                    if (payload.type === "HRMIC") {


                        for (this.numb_var = 2; this.numb_var < 32; this.numb_var++) {
                            this.updateData_har_curr_C(payload[this.numb_var]);

                        }

                    }
                    if (payload.type === "HRMIN") {


                        for (this.numb_var = 2; this.numb_var < 32; this.numb_var++) {
                            this.updateData_har_curr_N(payload[this.numb_var]);

                        }
                    }
                    if (payload.type === "PHYS") {


                        this.Data_1_acc_x = (payload['1']);
                        this.Data_1_acc_y = (payload['2']);
                        this.Data_1_acc_z = (payload['3']);
                        this.Data_1_temp = (payload['4']);
                        this.Data_1_oil_lvl = (payload['5']);
                        this.Data_1_cool_lvl = (payload['6']);
                    }



                }
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

    updateData_1_volt_A(value) {
        if (this.count <= 11) {
            this.dataSource_VRMS_1_volt.dataset[0]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_VRMS_1_volt.dataset[0]['data'][this.counter].value = this.dataSource_VRMS_1_volt.dataset[0]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_1_volt.dataset[0]['data'][11].value = value;
        }
    }
    updateData_1_volt_B(value) {
        if (this.count <= 11) {
            this.dataSource_VRMS_1_volt.dataset[1]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_VRMS_1_volt.dataset[1]['data'][this.counter].value = this.dataSource_VRMS_1_volt.dataset[1]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_1_volt.dataset[1]['data'][11].value = value;
        }
    }
    updateData_1_volt_C(value) {
        if (this.count <= 11) {
            this.dataSource_VRMS_1_volt.dataset[2]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_VRMS_1_volt.dataset[2]['data'][this.counter].value = this.dataSource_VRMS_1_volt.dataset[2]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_1_volt.dataset[2]['data'][11].value = value;
        }
    }
    updateData_1_curr_A(value) {
        if (this.count <= 11) {
            this.dataSource_VRMS_1_curr.dataset[0]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_VRMS_1_curr.dataset[0]['data'][this.counter].value = this.dataSource_VRMS_1_curr.dataset[0]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_1_curr.dataset[0]['data'][11].value = value;
        }
    }
    updateData_1_curr_B(value) {
        if (this.count <= 11) {
            this.dataSource_VRMS_1_curr.dataset[1]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_VRMS_1_curr.dataset[1]['data'][this.counter].value = this.dataSource_VRMS_1_curr.dataset[1]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_1_curr.dataset[1]['data'][11].value = value;
        }
    }
    updateData_1_curr_C(value) {
        if (this.count <= 11) {
            this.dataSource_VRMS_1_curr.dataset[2]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_VRMS_1_curr.dataset[2]['data'][this.counter].value = this.dataSource_VRMS_1_curr.dataset[2]['data'][this.counter + 1].value;
            }
            this.dataSource_VRMS_1_curr.dataset[2]['data'][11].value = value;
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
        if (this.count <= 31) {
            this.dataSource_har_volt.dataset[0]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 30; this.counter++) {

                this.dataSource_har_volt.dataset[0]['data'][this.counter].value = this.dataSource_har_volt.dataset[0]['data'][this.counter + 1].value;
            }
            this.dataSource_har_volt.dataset[0]['data'][31].value = value;
        }
    }
    updateData_har_volt_B(value) {
        if (this.count <= 31) {
            this.dataSource_har_volt.dataset[1]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 30; this.counter++) {

                this.dataSource_har_volt.dataset[1]['data'][this.counter].value = this.dataSource_har_volt.dataset[1]['data'][this.counter + 1].value;
            }
            this.dataSource_har_volt.dataset[1]['data'][31].value = value;
        }
    }
    updateData_har_volt_C(value) {
        if (this.count <= 31) {
            this.dataSource_har_volt.dataset[2]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 30; this.counter++) {

                this.dataSource_har_volt.dataset[2]['data'][this.counter].value = this.dataSource_har_volt.dataset[2]['data'][this.counter + 1].value;
            }
            this.dataSource_har_volt.dataset[2]['data'][31].value = value;
        }
    }

    updateData_har_curr_A(value) {
        if (this.count <= 31) {
            this.dataSource_har_curr.dataset[0]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 30; this.counter++) {

                this.dataSource_har_curr.dataset[0]['data'][this.counter].value = this.dataSource_har_curr.dataset[0]['data'][this.counter + 1].value;
            }
            this.dataSource_har_curr.dataset[0]['data'][31].value = value;
        }
    }
    updateData_har_curr_B(value) {
        if (this.count <= 31) {
            this.dataSource_har_curr.dataset[1]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 30; this.counter++) {

                this.dataSource_har_curr.dataset[1]['data'][this.counter].value = this.dataSource_har_curr.dataset[1]['data'][this.counter + 1].value;
            }
            this.dataSource_har_curr.dataset[1]['data'][31].value = value;
        }
    }
    updateData_har_curr_C(value) {
        if (this.count <= 31) {
            this.dataSource_har_curr.dataset[2]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 30; this.counter++) {

                this.dataSource_har_curr.dataset[2]['data'][this.counter].value = this.dataSource_har_curr.dataset[2]['data'][this.counter + 1].value;
            }
            this.dataSource_har_curr.dataset[2]['data'][31].value = value;
        }
    }
    updateData_har_curr_N(value) {
        if (this.count <= 31) {
            this.dataSource_har_curr.dataset[3]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 30; this.counter++) {

                this.dataSource_har_curr.dataset[3]['data'][this.counter].value = this.dataSource_har_curr.dataset[3]['data'][this.counter + 1].value;
            }
            this.dataSource_har_curr.dataset[3]['data'][31].value = value;
        }
    }
    updateData_time(value) {
        if (this.count <= 11) {
            this.dataSource_VRMS_1_volt.categories[0]['category'][this.count].label = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 10; this.counter++) {

                this.dataSource_VRMS_1_volt.categories[0]['category'][this.counter].label = this.dataSource_VRMS_1_volt.categories[0]['category'][this.counter + 1].label;
            }
            this.dataSource_VRMS_1_volt.categories[0]['category'][11].label = value;
        }
    }
    pad(num) { 
        return ("0"+num).slice(-2);
      }
     getTimeFromDate(timestamp) {
        var date = new Date(timestamp * 1000);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        return this.pad(hours)+":"+this.pad(minutes)+":"+this.pad(seconds)
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