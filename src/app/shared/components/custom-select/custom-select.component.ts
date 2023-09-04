import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    forwardRef,
    Inject,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { VISIBLE_ITEMS_COUNT } from '@core/tokens';

interface Item {
    name: string;
    id: number;
}

@Component({
    selector: 'app-custom-select',
    standalone: true,
    imports: [
        NgFor,
        NgIf,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatSelectModule,
        NgTemplateOutlet,
        ScrollingModule,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CustomSelectComponent),
            multi: true,
        },
    ],

    templateUrl: './custom-select.component.html',
    styleUrls: ['./custom-select.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomSelectComponent implements ControlValueAccessor, OnChanges {
    public showWithInput: boolean = false;
    @Input() items: Item[] | null = [];
    @Input() label: string = '';
    @Input() visibleItemsCount: number = 0;
    @Output() valueChanged = new EventEmitter<number>();
    @Output() searchValueChanged = new EventEmitter<string>();

    OPTION_HEIGHT = 48;

    searchText = '';
    selectedItemId: number | null = null;
    get itemSize(): number {
        return this.visibleItemsCount || this.itemsCount;
    }

    onChange: any = () => {};
    onTouch: any = () => {};

    constructor(@Inject(VISIBLE_ITEMS_COUNT) private itemsCount: number) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (
            changes['items'] &&
            changes['items'].currentValue?.length > 5 &&
            !changes['items'].previousValue
        ) {
            this.showWithInput = true;
        }
    }

    writeValue(id: number): void {
        this.selectedItemId = id;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    searchChanged(searchText: string): void {
        this.searchText = searchText;
        this.searchValueChanged.emit(searchText);
    }

    selectItem(id: number): void {
        this.onChange(id);
        // I have implemented this method as written
        // in the datasheet, but it is not required.
        this.valueChanged.emit(id);
    }

    trackById(index: number, item: Item): number {
        return item.id;
    }

    displayValue(value: Item): string {
        return value ? value.name : '';
    }
}
