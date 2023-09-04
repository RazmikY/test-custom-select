import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { UserService } from '@core/abstract/user.service';
import { IUser } from '@shared/models';

import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable()
export class HttpUserService extends UserService {
    private http = inject(HttpClient);

    private url = 'https://jsonplaceholder.typicode.com/users';
    private users$ = this.http.get<IUser[]>(this.url).pipe(shareReplay(1))

    getUsers(name: string): Observable<IUser[]> {
        return this.users$.pipe(
            map(data => data.filter(elem => this.filter(elem, name))),
            map((data) =>
                data.map((elem) => ({
                    id: elem.id,
                    name: elem.name,
                }))
            )
        );
    }

    private filter(item: IUser, name: string): boolean {
        return item.name.toLowerCase().includes(name.toLowerCase())
    }
}
