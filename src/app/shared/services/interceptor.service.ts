import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class InterceptorService implements HttpInterceptor {

    authToken: string;
    platForm: any;
    cfPlatforms: any;

    constructor(
        private router: Router,
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.authToken = localStorage.getItem("token");

        const started = Date.now();
        let ok: string;

        const authReq = req.clone({
            setHeaders: {
                /* 'Authorization': 'Bearer ' + this.authToken,*/
                'Authorization': 'Bearer ' + this.authToken,
            }
        });


        // const intervalTimeout = setInterval(() => {
        //     const timeTaken = (Date.now() - started) / 1000;
        //     if (timeTaken > 2) {
        //         this.loaderService.loadData('Please wait...');
        //         clearInterval(intervalTimeout);
        //     }
        //     console.log('Interceptor interval');
        // }, 100);

        return next.handle(authReq).pipe(
            tap(
                // Succeeds when there is a response; ignore other events
                event => ok = event instanceof HttpResponse ? 'succeeded' : '',
                // Operation failed; error is an HttpErrorResponse
                error => {
                    ok = error.status + 'failed';

                }
            ),
            // Log when response observable either completes or errors
            finalize(() => {
                const elapsed = Date.now() - started;
                const msg = `${req.method} "${req.urlWithParams}"
             ${ok} in ${elapsed} ms.`;
                // console.log(msg);
                // this.loaderService.unloadData('Please wait...');
                // if (intervalTimeout) {
                //     clearInterval(intervalTimeout);
                // }
            })
        );
    }



}
