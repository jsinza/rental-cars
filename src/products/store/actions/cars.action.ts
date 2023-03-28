import { createAction, props } from '@ngrx/store';

import { Car } from '../../models/car.model'

export const loadCars = createAction('[Products] Load Cars');

export const loadCarsSuccess = createAction('[Products] Load Cars Success', props<{ cars: Car[] }>());

export const searchCars = createAction('[Products] search Cars', props<{ filter: string }>());

export const selectedCar = createAction('[Products] selected Car', props<{ id: number }>());

