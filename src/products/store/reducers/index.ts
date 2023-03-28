import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromCars from './cars.reducer';

export interface ProductsState {
    cars: fromCars.CarsState;
}

export const reducers: ActionReducerMap<ProductsState> = {
    cars: fromCars.reducer,
};

export const getProductsState = createFeatureSelector<ProductsState>(
    'products'
);
