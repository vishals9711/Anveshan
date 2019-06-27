import { Component, OnInit } from '@angular/core';
import { IBMIoTPService } from '../../services/iotp/ibmIoTP.service';
import { LiveDataService } from '../../services/livedata/liveData.service';
import { apiCallServer } from '../../services/apicallserver/apiCallServer.service';



// Carbon Design Framework
import { DataTable } from 'carbon-components';
import { Checkbox } from 'carbon-components';

@Component({
    templateUrl: './wavecap.component.html',
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

export class wavecapaComponent implements OnInit {
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
    dataSource;
    id = 'chart1';
    width = '100%';
    height = 600;
    type = 'msline';
    type1 = 'column2d';
    dataFormat = 'json';
    bgColor = "#393d7c";
    count = 0;
    counter = 0;
    numb: number = 0;



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
        this.dataSource = {

            "chart": {
                "caption": "Wave-Form Capture",
                "xaxisname": "X-axis",
                "yaxisname": "Y-axis",
                "numbersuffix": "",
                "theme": "ocean",
                "showValues": "0",
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
                },
                {
                    "label": "12"
                },
                {
                    "label": "12"
                },
                {
                    "label": "13"
                },
                {
                    "label": "14"
                },

                {
                    "label": "15"
                },

                {
                    "label": "16"
                },

                {
                    "label": "17"
                },

                {
                    "label": "18"
                },

                {
                    "label": "19"
                },

                {
                    "label": "20"
                },
                {
                    "label": "21"
                },
                {
                    "label": "22"
                },
                {
                    "label": "23"
                },
                {
                    "label": "24"
                },

                {
                    "label": "25"
                },

                {
                    "label": "26"
                },

                {
                    "label": "27"
                },

                {
                    "label": "28"
                },

                {
                    "label": "29"
                },

                {
                    "label": "30"
                },

                {
                    "label": "31"
                },
                {
                    "label": "32"
                },
                {
                    "label": "33"
                },
                {
                    "label": "34"
                },

                {
                    "label": "35"
                },

                {
                    "label": "36"
                },

                {
                    "label": "37"
                },

                {
                    "label": "38"
                },

                {
                    "label": "39"
                },

                {
                    "label": "40"
                },
                {
                    "label": "41"
                },
                {
                    "label": "42"
                },
                {
                    "label": "43"
                },
                {
                    "label": "44"
                },

                {
                    "label": "45"
                },

                {
                    "label": "46"
                },

                {
                    "label": "47"
                },

                {
                    "label": "48"
                },

                {
                    "label": "49"
                },

                {
                    "label": "50"
                },
                {
                    "label": "51"
                },
                {
                    "label": "52"
                },
                {
                    "label": "53"
                },
                {
                    "label": "54"
                },

                {
                    "label": "55"
                },

                {
                    "label": "56"
                },

                {
                    "label": "57"
                },

                {
                    "label": "58"
                },

                {
                    "label": "59"
                },

                {
                    "label": "60"
                },
                {
                    "label": "61"
                },
                {
                    "label": "62"
                },
                {
                    "label": "63"
                },
                {
                    "label": "64"
                },

                {
                    "label": "65"
                },

                {
                    "label": "66"
                },

                {
                    "label": "67"
                },

                {
                    "label": "68"
                },

                {
                    "label": "69"
                },

                {
                    "label": "70"
                },
                {
                    "label": "71"
                },
                {
                    "label": "72"
                },
                {
                    "label": "73"
                },
                {
                    "label": "74"
                },

                {
                    "label": "75"
                },

                {
                    "label": "76"
                },

                {
                    "label": "77"
                },

                {
                    "label": "78"
                },

                {
                    "label": "79"
                },

                {
                    "label": "80"
                },
                {
                    "label": "81"
                },
                {
                    "label": "82"
                },
                {
                    "label": "83"
                },
                {
                    "label": "84"
                },

                {
                    "label": "85"
                },

                {
                    "label": "86"
                },

                {
                    "label": "87"
                },

                {
                    "label": "88"
                },

                {
                    "label": "89"
                },

                {
                    "label": "90"
                },
                {
                    "label": "91"
                },
                {
                    "label": "92"
                },
                {
                    "label": "93"
                },
                {
                    "label": "94"
                },

                {
                    "label": "95"
                },

                {
                    "label": "96"
                },

                {
                    "label": "97"
                },

                {
                    "label": "98"
                },

                {
                    "label": "99"
                },

                {
                    "label": "100"
                },
                {
                    "label": "101"
                },

                {
                    "label": "102"
                },
                {
                    "label": "103"
                },
                {
                    "label": "104"
                },

                {
                    "label": "105"
                },

                {
                    "label": "106"
                },

                {
                    "label": "107"
                },

                {
                    "label": "108"
                },

                {
                    "label": "109"
                },

                {
                    "label": "110"
                },
                {
                    "label": "111"
                },
                {
                    "label": "112"
                },
                {
                    "label": "113"
                },
                {
                    "label": "114"
                },

                {
                    "label": "115"
                },

                {
                    "label": "116"
                },

                {
                    "label": "117"
                },

                {
                    "label": "118"
                },

                {
                    "label": "119"
                },

                {
                    "label": "120"
                },
                {
                    "label": "121"
                },
                {
                    "label": "122"
                },
                {
                    "label": "123"
                },
                {
                    "label": "124"
                },

                {
                    "label": "125"
                },

                {
                    "label": "126"
                },

                {
                    "label": "127"
                },

                {
                    "label": "128"
                },

                {
                    "label": "129"
                },

                {
                    "label": "130"
                },

                {
                    "label": "131"
                },
                {
                    "label": "132"
                },
                {
                    "label": "133"
                },
                {
                    "label": "134"
                },

                {
                    "label": "135"
                },

                {
                    "label": "136"
                },

                {
                    "label": "137"
                },

                {
                    "label": "138"
                },

                {
                    "label": "139"
                },

                {
                    "label": "140"
                },
                {
                    "label": "141"
                },
                {
                    "label": "142"
                },
                {
                    "label": "143"
                },
                {
                    "label": "144"
                },

                {
                    "label": "145"
                },

                {
                    "label": "146"
                },

                {
                    "label": "147"
                },

                {
                    "label": "148"
                },

                {
                    "label": "149"
                },

                {
                    "label": "150"
                },
                {
                    "label": "151"
                },
                {
                    "label": "152"
                },
                {
                    "label": "153"
                },
                {
                    "label": "154"
                },

                {
                    "label": "155"
                },

                {
                    "label": "156"
                },

                {
                    "label": "157"
                },

                {
                    "label": "158"
                },

                {
                    "label": "159"
                },

                {
                    "label": "160"
                },
                {
                    "label": "161"
                },
                {
                    "label": "162"
                },
                {
                    "label": "163"
                },
                {
                    "label": "164"
                },

                {
                    "label": "165"
                },

                {
                    "label": "166"
                },

                {
                    "label": "167"
                },

                {
                    "label": "168"
                },

                {
                    "label": "169"
                },

                {
                    "label": "170"
                },
                {
                    "label": "171"
                },
                {
                    "label": "172"
                },
                {
                    "label": "173"
                },
                {
                    "label": "174"
                },

                {
                    "label": "175"
                },

                {
                    "label": "176"
                },

                {
                    "label": "177"
                },

                {
                    "label": "178"
                },

                {
                    "label": "179"
                },

                {
                    "label": "180"
                },
                {
                    "label": "181"
                },
                {
                    "label": "182"
                },
                {
                    "label": "183"
                },
                {
                    "label": "184"
                },

                {
                    "label": "185"
                },

                {
                    "label": "186"
                },

                {
                    "label": "187"
                },

                {
                    "label": "188"
                },

                {
                    "label": "189"
                },

                {
                    "label": "190"
                },
                {
                    "label": "191"
                },
                {
                    "label": "192"
                },
                {
                    "label": "193"
                },
                {
                    "label": "194"
                },

                {
                    "label": "195"
                },

                {
                    "label": "196"
                },

                {
                    "label": "197"
                },

                {
                    "label": "198"
                },

                {
                    "label": "199"
                },

                {
                    "label": "200"
                },
                {
                    "label": "201"
                },
                {
                    "label": "202"
                },
                {
                    "label": "203"
                },
                {
                    "label": "204"
                },

                {
                    "label": "205"
                },

                {
                    "label": "206"
                },

                {
                    "label": "207"
                },

                {
                    "label": "208"
                },

                {
                    "label": "209"
                },

                {
                    "label": "210"
                },
                {
                    "label": "211"
                },
                {
                    "label": "212"
                },
                {
                    "label": "212"
                },
                {
                    "label": "213"
                },
                {
                    "label": "214"
                },

                {
                    "label": "215"
                },

                {
                    "label": "216"
                },

                {
                    "label": "217"
                },

                {
                    "label": "218"
                },

                {
                    "label": "219"
                },

                {
                    "label": "220"
                },
                {
                    "label": "221"
                },
                {
                    "label": "222"
                },
                {
                    "label": "223"
                },
                {
                    "label": "224"
                },

                {
                    "label": "225"
                },

                {
                    "label": "226"
                },

                {
                    "label": "227"
                },

                {
                    "label": "228"
                },

                {
                    "label": "229"
                },

                {
                    "label": "230"
                },

                {
                    "label": "231"
                },
                {
                    "label": "232"
                },
                {
                    "label": "233"
                },
                {
                    "label": "234"
                },

                {
                    "label": "235"
                },

                {
                    "label": "236"
                },

                {
                    "label": "237"
                },

                {
                    "label": "238"
                },

                {
                    "label": "239"
                },

                {
                    "label": "240"
                },
                {
                    "label": "241"
                },
                {
                    "label": "242"
                },
                {
                    "label": "243"
                },
                {
                    "label": "244"
                },

                {
                    "label": "245"
                },

                {
                    "label": "246"
                },

                {
                    "label": "247"
                },

                {
                    "label": "248"
                },

                {
                    "label": "249"
                },

                {
                    "label": "250"
                },
                {
                    "label": "251"
                },
                {
                    "label": "252"
                },
                {
                    "label": "253"
                },
                {
                    "label": "254"
                },

                {
                    "label": "255"
                },

                {
                    "label": "256"
                },

                {
                    "label": "257"
                },

                {
                    "label": "258"
                },

                {
                    "label": "259"
                },

                {
                    "label": "260"
                },
                {
                    "label": "261"
                },
                {
                    "label": "262"
                },
                {
                    "label": "263"
                },
                {
                    "label": "264"
                },

                {
                    "label": "265"
                },

                {
                    "label": "266"
                },

                {
                    "label": "267"
                },

                {
                    "label": "268"
                },

                {
                    "label": "269"
                },

                {
                    "label": "270"
                },
                {
                    "label": "271"
                },
                {
                    "label": "272"
                },
                {
                    "label": "273"
                },
                {
                    "label": "274"
                },

                {
                    "label": "275"
                },

                {
                    "label": "276"
                },

                {
                    "label": "277"
                },

                {
                    "label": "278"
                },

                {
                    "label": "279"
                },

                {
                    "label": "280"
                },
                {
                    "label": "281"
                },
                {
                    "label": "282"
                },
                {
                    "label": "283"
                },
                {
                    "label": "284"
                },

                {
                    "label": "285"
                },

                {
                    "label": "286"
                },

                {
                    "label": "287"
                },

                {
                    "label": "288"
                },

                {
                    "label": "289"
                },

                {
                    "label": "290"
                },
                {
                    "label": "291"
                },
                {
                    "label": "292"
                },
                {
                    "label": "293"
                },
                {
                    "label": "294"
                },

                {
                    "label": "295"
                },

                {
                    "label": "296"
                },

                {
                    "label": "297"
                },

                {
                    "label": "298"
                },

                {
                    "label": "299"
                },

                {
                    "label": "300"
                },

                {
                    "label": "301"
                },
                {
                    "label": "302"
                },
                {
                    "label": "303"
                },
                {
                    "label": "304"
                },

                {
                    "label": "305"
                },

                {
                    "label": "306"
                },

                {
                    "label": "307"
                },

                {
                    "label": "308"
                },

                {
                    "label": "309"
                },

                {
                    "label": "310"
                },
                {
                    "label": "311"
                },
                {
                    "label": "312"
                },
                {
                    "label": "312"
                },
                {
                    "label": "313"
                },
                {
                    "label": "314"
                },

                {
                    "label": "315"
                },

                {
                    "label": "316"
                },

                {
                    "label": "317"
                },

                {
                    "label": "318"
                },

                {
                    "label": "319"
                },

                {
                    "label": "320"
                },
                {
                    "label": "321"
                },
                {
                    "label": "322"
                },
                {
                    "label": "323"
                },
                {
                    "label": "324"
                },

                {
                    "label": "325"
                },

                {
                    "label": "326"
                },

                {
                    "label": "327"
                },

                {
                    "label": "328"
                },

                {
                    "label": "329"
                },

                {
                    "label": "330"
                },

                {
                    "label": "331"
                },
                {
                    "label": "332"
                },
                {
                    "label": "333"
                },
                {
                    "label": "334"
                },

                {
                    "label": "335"
                },

                {
                    "label": "336"
                },

                {
                    "label": "337"
                },

                {
                    "label": "338"
                },

                {
                    "label": "339"
                },

                {
                    "label": "340"
                },
                {
                    "label": "341"
                },
                {
                    "label": "342"
                },
                {
                    "label": "343"
                },
                {
                    "label": "344"
                },

                {
                    "label": "345"
                },

                {
                    "label": "346"
                },

                {
                    "label": "347"
                },

                {
                    "label": "348"
                },

                {
                    "label": "349"
                },

                {
                    "label": "350"
                },
                {
                    "label": "351"
                },
                {
                    "label": "352"
                },
                {
                    "label": "353"
                },
                {
                    "label": "354"
                },

                {
                    "label": "355"
                },

                {
                    "label": "356"
                },

                {
                    "label": "357"
                },

                {
                    "label": "358"
                },

                {
                    "label": "359"
                },

                {
                    "label": "360"
                },
                {
                    "label": "361"
                },
                {
                    "label": "362"
                },
                {
                    "label": "363"
                },
                {
                    "label": "364"
                },

                {
                    "label": "365"
                },

                {
                    "label": "366"
                },

                {
                    "label": "367"
                },

                {
                    "label": "368"
                },

                {
                    "label": "369"
                },

                {
                    "label": "370"
                },
                {
                    "label": "371"
                },
                {
                    "label": "372"
                },
                {
                    "label": "373"
                },
                {
                    "label": "374"
                },

                {
                    "label": "375"
                },

                {
                    "label": "376"
                },

                {
                    "label": "377"
                },

                {
                    "label": "378"
                },

                {
                    "label": "379"
                },

                {
                    "label": "380"
                },
                {
                    "label": "381"
                },
                {
                    "label": "382"
                },
                {
                    "label": "383"
                },
                {
                    "label": "384"
                },

                {
                    "label": "385"
                },

                {
                    "label": "386"
                },

                {
                    "label": "387"
                },

                {
                    "label": "388"
                },

                {
                    "label": "389"
                },

                {
                    "label": "390"
                },
                {
                    "label": "391"
                },
                {
                    "label": "392"
                },
                {
                    "label": "393"
                },
                {
                    "label": "394"
                },

                {
                    "label": "395"
                },

                {
                    "label": "396"
                },

                {
                    "label": "397"
                },

                {
                    "label": "398"
                },

                {
                    "label": "399"
                },

                {
                    "label": "400"
                },
                {
                    "label": "401"
                },
                {
                    "label": "402"
                },
                {
                    "label": "403"
                },
                {
                    "label": "404"
                },

                {
                    "label": "405"
                },

                {
                    "label": "406"
                },

                {
                    "label": "407"
                },

                {
                    "label": "408"
                },

                {
                    "label": "409"
                },

                {
                    "label": "410"
                },
                {
                    "label": "411"
                },
                {
                    "label": "412"
                },
                {
                    "label": "412"
                },
                {
                    "label": "413"
                },
                {
                    "label": "414"
                },

                {
                    "label": "415"
                },

                {
                    "label": "416"
                },

                {
                    "label": "417"
                },

                {
                    "label": "418"
                },

                {
                    "label": "419"
                },

                {
                    "label": "420"
                },
                {
                    "label": "421"
                },
                {
                    "label": "422"
                },
                {
                    "label": "423"
                },
                {
                    "label": "424"
                },

                {
                    "label": "425"
                },

                {
                    "label": "426"
                },

                {
                    "label": "427"
                },

                {
                    "label": "428"
                },

                {
                    "label": "429"
                },

                {
                    "label": "430"
                },

                {
                    "label": "431"
                },
                {
                    "label": "432"
                },
                {
                    "label": "433"
                },
                {
                    "label": "434"
                },

                {
                    "label": "435"
                },

                {
                    "label": "436"
                },

                {
                    "label": "437"
                },

                {
                    "label": "438"
                },

                {
                    "label": "439"
                },

                {
                    "label": "440"
                },
                {
                    "label": "441"
                },
                {
                    "label": "442"
                },
                {
                    "label": "443"
                },
                {
                    "label": "444"
                },

                {
                    "label": "445"
                },

                {
                    "label": "446"
                },

                {
                    "label": "447"
                },

                {
                    "label": "448"
                },

                {
                    "label": "449"
                },

                {
                    "label": "450"
                },
                {
                    "label": "451"
                },
                {
                    "label": "452"
                },
                {
                    "label": "453"
                },
                {
                    "label": "454"
                },

                {
                    "label": "455"
                },

                {
                    "label": "456"
                },

                {
                    "label": "457"
                },

                {
                    "label": "458"
                },

                {
                    "label": "459"
                },

                {
                    "label": "460"
                },
                {
                    "label": "461"
                },
                {
                    "label": "462"
                },
                {
                    "label": "463"
                },
                {
                    "label": "464"
                },

                {
                    "label": "465"
                },

                {
                    "label": "466"
                },

                {
                    "label": "467"
                },

                {
                    "label": "468"
                },

                {
                    "label": "469"
                },

                {
                    "label": "470"
                },
                {
                    "label": "471"
                },
                {
                    "label": "472"
                },
                {
                    "label": "473"
                },
                {
                    "label": "474"
                },

                {
                    "label": "475"
                },

                {
                    "label": "476"
                },

                {
                    "label": "477"
                },

                {
                    "label": "478"
                },

                {
                    "label": "479"
                },

                {
                    "label": "480"
                },
                {
                    "label": "481"
                },
                {
                    "label": "482"
                },
                {
                    "label": "483"
                },
                {
                    "label": "484"
                },

                {
                    "label": "485"
                },

                {
                    "label": "486"
                },

                {
                    "label": "487"
                },

                {
                    "label": "488"
                },

                {
                    "label": "489"
                },

                {
                    "label": "490"
                },
                {
                    "label": "491"
                },
                {
                    "label": "492"
                },
                {
                    "label": "493"
                },
                {
                    "label": "494"
                },

                {
                    "label": "495"
                },

                {
                    "label": "496"
                },

                {
                    "label": "497"
                },

                {
                    "label": "498"
                },

                {
                    "label": "499"
                },

                {
                    "label": "500"
                },
                {
                    "label": "501"
                },
                {
                    "label": "502"
                },
                {
                    "label": "503"
                },
                {
                    "label": "504"
                },

                {
                    "label": "505"
                },

                {
                    "label": "506"
                },

                {
                    "label": "507"
                },

                {
                    "label": "508"
                },

                {
                    "label": "509"
                },

                {
                    "label": "510"
                },
                {
                    "label": "511"
                }]


            }],
            "dataset": [{
                "seriesname": "Device 1",
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
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
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
                "seriesname": "Device 2",
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
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },


                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },

                {
                    "value": "0"
                },
                {
                    "value": "0"
                },
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
            }
            ]
        };
    }

    ngOnInit() {
        this.connection = this.liveDataService.getMessages().subscribe(message => {
            this.messages.push(message);

            if (message["type"] === "new_sensorData") {
                console.log("TEXT", message["text"]);

                var payload = JSON.parse(message["text"])["d"];
                this.messages.push(message);
                const deviceId = payload["id"];
                if(payload.id==="2"){

                if (payload.type === "BUFFER") {
                    for (this.numb = 0; this.numb < 512; this.numb++) {
                        console.log("11111111111111111111");
                        console.log(payload[1][this.numb]);
                        console.log("11111111111111111111");
                        this.updateData_1(payload[1][this.numb]);
                    }
                }
            }
            if(payload.id==="1"){

                if (payload.type === "BUFFER") {
                    for (this.numb = 0; this.numb < 512; this.numb++) {
                        console.log("11111111111111111111");
                        console.log(payload[1][this.numb]);
                        console.log("11111111111111111111");
                        this.updateData_2(payload[1][this.numb]);
                    }
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

    updateData_1(value) {
        if (this.count <= 511) {
            this.dataSource.dataset[0]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 510; this.counter++) {

                this.dataSource.dataset[0]['data'][this.counter].value = this.dataSource.dataset[0]['data'][this.counter + 1].value;
            }
            this.dataSource.dataset[0]['data'][511].value = value;
        }
    }
    ////
    updateData_2(value) {
        if (this.count <= 511) {
            this.dataSource.dataset[1]['data'][this.count].value = value;
            this.count++;
        }
        else {
            for (this.counter = 0; this.counter <= 510; this.counter++) {

                this.dataSource.dataset[1]['data'][this.counter].value = this.dataSource.dataset[1]['data'][this.counter + 1].value;
            }
            this.dataSource.dataset[1]['data'][511].value = value;
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