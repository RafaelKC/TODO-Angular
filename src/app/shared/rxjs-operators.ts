import { HttpEvent, HttpEventType, HttpResponse } from "@angular/common/http";
import { pipe } from "rxjs";
import { filter, map } from "rxjs/operators";

export function filterResponde<T>() {
    return pipe(
        filter((event: HttpEvent<T>) => ejvent.type === HttpEventType.Response),
        map((res: HttpResponse<T>) => res.body) 
    )
}