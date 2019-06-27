import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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




export const routes: Routes = [
  { path: '', redirectTo: '/devices', pathMatch: 'full' },
  { path: 'devices', component: DevicesComponent },
  { path: 'status', component: StatusComponent },
  { path: 'grida', component: gridaiComponent },
  { path: 'gridb', component: gridbiComponent },
  { path: 'gridc', component: gridciComponent },
  { path: 'zxphase', component: zxphase1Component },
  { path: 'load', component: load1Component },
  { path: 'logging', component: logging1Component },
  { path: 'motor1', component: dmotor1Component },
  { path: 'motor2', component: dmotor2Component },
  { path: 'trend', component: trendaComponent },
  { path: 'coolfan', component: coolfan1Component },
  { path: 'energy', component: energyaComponent },
  { path: 'wavecap', component: wavecapaComponent },
  { path: 'phase', component: phaseaComponent },

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);