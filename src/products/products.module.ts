import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store';
import { effects } from './store/effects';


import * as fromComponents from './components';
import * as fromProviders from './providers'
import * as fromContainers from './containers';
import * as fromGuards from './guards';
import { OverlayModule } from '@angular/cdk/overlay';

export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [fromGuards.CarsGuard],
        component: fromContainers.ProductsComponent,
    },
];

@NgModule({
    imports: [CommonModule, OverlayModule, RouterModule.forChild(ROUTES), StoreModule.forFeature('products', reducers), EffectsModule.forFeature(effects),
    ],
    exports: [...fromContainers.containers, ...fromComponents.components],
    declarations: [...fromContainers.containers, ...fromComponents.components],
    providers: [...fromGuards.guards, ...fromProviders.providers],
})
export class ProductsModule { }
