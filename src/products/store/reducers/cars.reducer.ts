
import * as fromCars from '../actions/cars.action';

import { Car } from '../../models/car.model'
import { createReducer, on } from '@ngrx/store';


export interface CarsState {
    entities: { [id: number]: Car };
    loaded: boolean;
    loading: boolean;
    selectedCar: Car | undefined
}

export const initialState: CarsState = {
    entities: {},
    loaded: false,
    loading: false,
    selectedCar: undefined
};

export const reducer = createReducer(
    initialState,
    on(fromCars.loadCars, state => ({
        ...state,
        loading: true,
    })),
    on(fromCars.selectedCar, (state, { id }) => {
        const car = state.entities[id]
        return {
            ...state,
            selectedCar: { ...car }
        }
    }),
    on(fromCars.loadCarsSuccess, (state, { cars }) => {
        const entities = cars?.reduce(
            (entities: { [id: number]: Car }, car: Car) => {
                return {
                    ...entities,
                    [car.id]: car,
                };
            }, {}
        );
        return {
            ...state,
            loading: false,
            loaded: true,
            entities,
        };

    }),
);

export const getCarsEntities = (state: CarsState) => state.entities;
export const getCarsLoading = (state: CarsState) => state.loading;
export const getCarsLoaded = (state: CarsState) => state.loaded;
export const getSelectedCar = (state: CarsState) => state.selectedCar;
