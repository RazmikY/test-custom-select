import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    ReactiveFormsModule,
    FormControl,
    FormsModule,
    FormBuilder,
} from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, debounceTime } from 'rxjs/operators';

import { CustomSelectComponent } from '@shared/components';
import { UserService } from '@core/abstract';
import { IUser } from '@shared/models';

@Component({
    selector: 'app-demo',
    standalone: true,
    imports: [
        CommonModule,
        CustomSelectComponent,
        ReactiveFormsModule,
        FormsModule,
    ],
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoComponent {
    fcSelect = new FormControl<number | null>(null);
    nmSelect = '';
    formGroup = this.fb.group({
        select: [''],
    });

    searchTextFC = new BehaviorSubject('');
    searchTextNM = new BehaviorSubject('');
    searchTextFCN = new BehaviorSubject('');

    itemsFC = this.getUsers(this.searchTextFC.asObservable());

    itemsNM = this.getUsers(this.searchTextNM.asObservable());

    itemsFCN = this.getUsers(this.searchTextFCN.asObservable());

    constructor(private fb: FormBuilder, private userService: UserService) {}

    getUsers(obs: Observable<string>): Observable<IUser[]> {
        return obs.pipe(
            debounceTime(300),
            switchMap((value) => this.userService.getUsers(value))
        );
    }
}
