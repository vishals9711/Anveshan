import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';


//Charts
import * as FusionCharts from 'fusioncharts';
import * as powerCharts from 'fusioncharts/fusioncharts.powercharts';
import { FusionChartsModule } from 'angular4-fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import * as OceanTheme from 'fusioncharts/themes/fusioncharts.theme.ocean';
//Gauge
import { NgxGaugeModule } from 'ngx-gauge';
//amcharts





import { ChartsModule } from 'ng2-charts';


// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { DevicesComponent } from './components/devices/devices.component';
import { StatusComponent } from './components/status/status.component';
import { gridaiComponent } from './components/grida/grida.component';
import { gridbiComponent } from './components/gridb/gridb.component';
import { gridciComponent } from './components/gridc/gridc.component';
import { zxphase1Component } from './components/zxphase/zxphase.component';
import { load1Component } from './components/load/load.component';
import { logging1Component } from './components/logging/logging.component';
import { dmotor1Component } from './components/motor1/motor1.component';
import { dmotor2Component } from './components/motor2/motor2.component';
import { trendaComponent } from './components/trend/trend.component';
import { coolfan1Component } from './components/coolfan/coolfan.component';
import { energyaComponent } from './components/energy/energy.component';
import { wavecapaComponent } from './components/wavecap/wavecap.component';
import { phaseaComponent } from './components/phase/phase.component';




// Services
import { IBMIoTPService } from './services/iotp/ibmIoTP.service'
import { LiveDataService } from './services/livedata/liveData.service'
import { apiCallServer } from './services/apicallserver/apiCallServer.service'

// Routing
import { routing } from './app.routes';

FusionChartsModule.fcRoot(FusionCharts, powerCharts, Charts, FintTheme, OceanTheme);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    DevicesComponent,
    StatusComponent,
    gridaiComponent,
    gridbiComponent,
    gridciComponent,
    zxphase1Component,
    load1Component,
    logging1Component,
    dmotor1Component,
    dmotor2Component,
    trendaComponent,
    coolfan1Component,
    energyaComponent,
    wavecapaComponent,
    phaseaComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    routing,
    FusionChartsModule,
    ChartsModule,
    NgxGaugeModule
  ],
  providers: [
    IBMIoTPService,
    LiveDataService,
    apiCallServer
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }