import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Car } from 'src/products/models/car.model';

@Component({
  selector: 'car-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div (click)="selected.emit(car?.id)" class="cursor-pointer">
    <div
      class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8"
    >
      <img
        [src]="car?.photo"
        [alt]="car?.brand + ''+ car?.model"
        class="h-full w-full object-cover object-center group-hover:opacity-75"
      />
    </div>
    <h3 class="mt-4 text-sm text-gray-700">{{car?.model}}</h3>
    <h4 class="mt-4 text-sm text-gray-700">{{car?.brand}}</h4>
    <p class="mt-1 text-lg font-medium text-gray-900">
      {{car?.price | currency }}
    </p>
  </div>
`
})

export class CarItemComponent implements OnInit {

  @Input() car: Car | undefined | null

  @Output() selected = new EventEmitter<number>();

  constructor() { }

  ngOnInit() { }
}