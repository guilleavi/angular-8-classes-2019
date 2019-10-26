import { Injectable } from '@angular/core';
import { of, throwError, concat, Subscription, Observable } from 'rxjs';
import { map, take, first, finalize } from 'rxjs/operators';
import { timeout } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ObservableSamplesUtil {
  // https://en.wikipedia.org/wiki/Observer_pattern
  // http://reactivex.io/
  // https://rxjs-dev.firebaseapp.com/

  constructor() {
  }

  // Cold Observable: you have to subscribe to start the emission.
  // Hot Observable: emits as soon as is created. Like a Subject.

  triggerMethod(): void {
    // this.unsubscribeWithFinalize();
  }

  getValuesWithDifTypes(): void {
    const myObservable$ = of(123, 'Hello World!', [5, 6, 7], undefined, { id: 1, name: 'Pepito'});
    myObservable$.subscribe( value => {
      console.log('New value: ', value);
    });
  }

  simulateBEResponse(): void {
    // This is a Single. An observable that emits a single value. You don't need to implement the complete().
    const responseData = [
      {
        id: 1,
        name: 'SantiA'
      },
      {
        id: 2,
        name: 'Pepito'
      },
      {
        id: 3,
        name: 'La Sirenita de Parana'
      }
    ];
    const myObservable$ = of(responseData);
    myObservable$.subscribe(
      value => {
        console.log('New value: ', value);
      },
      error => {}
    );
  }

  getValuesAndComplete1(): void {
    const myObservable$ = of(1, 2, 3, 4, 5);
    myObservable$.subscribe(
      value => {
        console.log('New value: ', value);
      },
      error => {
        console.log('Oooopsss!');
      },
      () => {
        console.log(`That's all Folks!`);
      }
    );
  }

  getValuesAndComplete2(): void {
    const myObservable$ = of(1, 2, 3, 4, 5);
    myObservable$.subscribe({
      next: value => {
        console.log('New value: ', value);
      },
      error: error => {
        console.log('Oooopsss!');
      },
      complete: () => {
        console.log(`That's all Folks!`);
      }
    });
  }

  getValuesAndThrowError(): void {
    const myObservable$ = concat(of(1, 2, 3), throwError(new Error('oops!')), of(4, 5));
    myObservable$.subscribe({
        next: value => {
          console.log('New value: ', value);
        },
        error: error => {
          console.log('Oooopsss!');
        },
        complete: () => {
          console.log(`That's all Folks!`);
        }
    });
  }

  getValuesWithFirstOperator(): void {
    const myObservable$ = concat(of(1, 2, 3), throwError(new Error('oops!')), of(4, 5));
    myObservable$.pipe(
      take(1) // first() - take(2) - take(3) - take(4) - take(5)
    ).subscribe({
        next: value => {
          console.log('New value: ', value);
        },
        error: error => {
          console.log('Oooopsss!');
        },
        complete: () => {
          console.log(`That's all Folks!`);
        }
      });
    // Just keep in mind that take(1) still doesn’t unsubscribe when component is being destroyed.
    // The subscription remains active until first value is emitted no matter if component is active or destroyed.
  }

  getValuesWithFinalizeOperator(): void {
    const myObservable$ = concat(of(1, 2, 3), throwError(new Error('oops!')), of(4, 5));
    myObservable$.pipe(
      take(5), // first() - take(2) - take(3) - take(4) - take(5)
      finalize(
        () => {
          console.log('Finally');
        }
      )
    ).subscribe({
        next: value => {
          console.log('New value: ', value);
        },
        error: error => {
          console.log('Oooopsss!');
        },
        complete: () => {
          console.log(`That's all Folks!`);
        }
    });
  }

  asyncObservable(): void {
    const myObservable$ = new Observable(subscriber => {
      subscriber.next(1);
      setInterval(() => {
        subscriber.next(2);
      }, 500);
      subscriber.next(3);
      subscriber.next(4);
      subscriber.next(5);
      setInterval(() => {
        subscriber.next(6);
        subscriber.complete();
      }, 4500);
      subscriber.next(7);
    });

    myObservable$.subscribe({
        next: value => {
          console.log('New value: ', value);
        },
        error: error => {
          console.log('Oooopsss!');
        },
        complete: () => {
          console.log(`That's all Folks!`);
        }
    });
  }

  unsubscribeWithTake() {
    let mySubscription =  new Subscription();
    const myObservable$ = new Observable(subscriber => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
    });
    mySubscription = myObservable$.pipe(
      take(2),
      finalize(
        () => {
          console.log('Finally');
        }
      )
    ).subscribe({
        next: value => {
          console.log('New value: ', value);
          console.log(mySubscription);
        },
        error: error => {
          console.log('Oooopsss!');
        },
        complete: () => {
          console.log(`That's all Folks!`);
        }
    });
    console.log(mySubscription);
  }

  unsubscribeWithFinalize() {
    let mySubscription =  new Subscription();
    const myObservable$ = new Observable(subscriber => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      subscriber.complete();
    });
    mySubscription = myObservable$.pipe(
      finalize(
        () => {
          console.log('Finally');
          mySubscription.unsubscribe();
          console.log(mySubscription);
          mySubscription.unsubscribe();
          console.log(mySubscription);
        }
      )
    ).subscribe({
        next: value => {
          console.log('New value: ', value);
          console.log(mySubscription);
        },
        error: error => {
          console.log('Oooopsss!');
        },
        complete: () => {
          console.log(`That's all Folks!`);
          console.log(mySubscription);
        }
    });

  }

}
