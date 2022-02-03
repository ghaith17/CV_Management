import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowCvComponent } from './CV/show-cv.component';

const routes: Routes = [
    {path:'cv',component:ShowCvComponent}
    
    ];
    
    @NgModule({
      imports: [RouterModule.forRoot(routes)],
      exports: [RouterModule]
    })
    export class AppRoutingModule { }
    