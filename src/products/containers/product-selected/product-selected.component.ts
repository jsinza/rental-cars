import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Car } from 'src/products/models/car.model';
import { ModalRef } from 'src/products/providers/modal/modal.ref';
import * as fromStore from '../../store';

@Component({
  selector: 'product-selected',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'product-selected.component.html'
})

export class ProductSelectedComponent implements OnInit {

  selectedCar$: Observable<Car | undefined> | undefined;

  constructor(
    private modalRef: ModalRef<ProductSelectedComponent, {}>,
    private store: Store<fromStore.ProductsState>) { }

  ngOnInit() {
    this.selectedCar$ = this.store.select(fromStore.getSelectedCar);
  }

  close() {
    this.modalRef.close();
  }
}