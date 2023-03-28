import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Car } from 'src/products/models/car.model';
import { Modal } from 'src/products/providers';
import { ModalRef } from 'src/products/providers/modal/modal.ref';
import * as fromStore from '../../store';
import { ProductSelectedComponent } from '../product-selected/product-selected.component';

@Component({
  selector: 'products',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header (search)="searchCars($event)"></header>
    <div class="bg-white">
    <div class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
    <div *ngIf="!((cars$ | async)?.length)" class="flex justify-center w-full items-center	text-lg">
          There are no results for your search.
        </div>
      <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <car-item
          (selected)="openModal($event)"
          *ngFor="let car of (cars$ | async)"
          [car]="car">
        </car-item>
      </div>
    </div>
  `,
})

export class ProductsComponent implements OnInit {

  cars$: Observable<Car[]> | undefined;

  constructor(private store: Store<fromStore.ProductsState>, private modal: Modal) { }

  ngOnInit() {
    this.cars$ = this.store.select(fromStore.getAllCars);
  }

  searchCars(filter: string) {
    this.store.dispatch(fromStore.searchCars({ filter }))
  }

  openModal(id: number) {
    this.store.dispatch(fromStore.selectedCar({ id }))
    const ref: ModalRef<ProductSelectedComponent, {}> = this.modal.open(
      ProductSelectedComponent,
      {},
      {
        panelClass: 'test-panel',
        closeOnBackdropClick: true,
        closeOnEscKey: true,
      },
    );

    ref.onClose().subscribe(_ => {
      this.store.dispatch(fromStore.selectedCar({ id: -1 }))
    });
  }
}