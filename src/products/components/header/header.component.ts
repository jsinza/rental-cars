import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'header.component.html'
})

export class HeaderComponent implements OnInit {

  @Output() search = new EventEmitter<string>();

  constructor() { }

  ngOnInit() { }
}