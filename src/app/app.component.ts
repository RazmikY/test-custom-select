import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DemoComponent } from './demo/demo.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [DemoComponent],
})
export class AppComponent {
    title = 'test-select';
}
