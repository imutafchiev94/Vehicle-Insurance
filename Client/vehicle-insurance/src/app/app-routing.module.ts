import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo:'home', pathMatch: 'full'},
  { path: 'owners', loadChildren: () => import('./owners/owners.module').then(m => m.OwnersModule) },
  { path: 'vehicles', loadChildren: () => import('./vehicles/vehicles.module').then(m => m.VehiclesModule) },
  { path: 'insurances', loadChildren: () => import('./insurances/insurances.module').then(m => m.InsurancesModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'accidents', loadChildren: () => import('./accidents/accidents.module').then(m => m.AccidentsModule) },
  { path: '**', loadChildren: () => import('./error-page/error-page.module').then(m => m.ErrorPageModule) }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
