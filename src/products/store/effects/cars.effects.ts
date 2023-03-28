import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as carsActions from '../actions/cars.action';
import { exhaustMap, map, tap } from 'rxjs/operators';
import data from '../../data/cars.json';

@Injectable()
export class CarsEffects {
    constructor(
        private actions$: Actions) {
    }
    loadCars$ = createEffect(() =>
        this.actions$.pipe(
            ofType(carsActions.loadCars),
            exhaustMap(async () => carsActions.loadCarsSuccess({ cars: data.cars }))) 
    )

    searchCars$ = createEffect(() =>
        this.actions$.pipe(
            ofType(carsActions.searchCars),
            exhaustMap(async ({ filter }) => {
                const regex = new RegExp(`${filter}.*`,'i')
                const carsFilter = filter ? data.cars.filter((car) => regex.test(car.brand)) : data.cars
                return carsActions.loadCarsSuccess({ cars: carsFilter })
            })
        ))
}
