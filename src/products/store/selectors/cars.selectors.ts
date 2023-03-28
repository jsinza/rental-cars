import { createSelector } from "@ngrx/store";

import * as fromFeature from '../reducers';
import * as fromCars from '../reducers/cars.reducer';

export const getCarsState = createSelector(
    fromFeature.getProductsState,
    (state: fromFeature.ProductsState) => state.cars
);

export const getCarsEntities = createSelector(
    getCarsState,
    fromCars.getCarsEntities
);

export const getAllCars = createSelector(getCarsEntities, entities => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});

export const getCarsLoaded = createSelector(
    getCarsState,
    fromCars.getCarsLoaded
);
export const getCarsLoading = createSelector(
    getCarsState,
    fromCars.getCarsLoading
);

export const getSelectedCar = createSelector(
    getCarsState,
    fromCars.getSelectedCar
);

