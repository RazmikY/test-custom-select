import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IUser } from '@shared/models';

@Injectable()
export abstract class UserService {
    abstract getUsers(name: string): Observable<IUser[]>;
}
