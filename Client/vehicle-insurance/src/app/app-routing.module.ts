import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo:'dashboard', pathMatch: 'full'},
  { path: 'owners', loadChildren: () => import('./owners/owners.module').then(m => m.OwnersModule) },
  { path: 'vehicles', loadChildren: () => import('./vehicles/vehicles.module').then(m => m.VehiclesModule) },
  { path: 'payments', loadChildren: () => import('./payments/payments.module').then(m => m.PaymentsModule) },
  { path: 'insurances', loadChildren: () => import('./insurances/insurances.module').then(m => m.InsurancesModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: '**', loadChildren: () => import('./error-page/error-page.module').then(m => m.ErrorPageModule) }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
