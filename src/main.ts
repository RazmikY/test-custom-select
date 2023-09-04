import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http'

import { AppComponent } from './app/app.component';
import { UserService } from '@core/abstract';
import { HttpUserService } from '@core/service';

bootstrapApplication(AppComponent, {
    providers: [
        provideAnimations(),
        provideHttpClient(),
        {
            provide: UserService,
            useClass: HttpUserService,
        },
    ],
});
