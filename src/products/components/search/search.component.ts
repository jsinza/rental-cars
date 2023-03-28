import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'search',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <input
    id="search"
    (input)="onSearchQueryInput($event)"
    name="search"
    class="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:text-gray-900 focus:outline-none focus:ring-1 sm:text-sm"
    [placeholder]="placeholder"
    type="search"
    />
    `
})

export class SearchComponent implements OnInit {

    private readonly searchSubject = new Subject<string | undefined>();

    @Output() search = new EventEmitter<string>();

    @Input() placeholder: string = ''

    constructor() {
    }

    public onSearchQueryInput(event: Event): void {
        const searchQuery = (event.target as HTMLInputElement).value;
        this.searchSubject.next(searchQuery?.trim());
    }

    ngOnInit(): void {
        this.searchSubject
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
            )
            .subscribe((results) => (this.search.emit(results)));
    }

    ngOnDestroy() {
        this.searchSubject.unsubscribe()
    }
}