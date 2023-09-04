import { InjectionToken } from '@angular/core';

export const VISIBLE_ITEMS_COUNT = new InjectionToken<number>(
    'visible items count for virtual scrolling',
    {
        factory: () => 5,
    }
);
