//catchError but apply to inner sub, prior to concatMap, allowing for main sub to continue and not complete

import { EMPTY, fromEvent, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { catchError, concatMap, map } from "rxjs/operators";

const endpointInput: HTMLInputElement = document.querySelector('input#endpoint');
const fetchButton = document.querySelector('button#fetch');

//grab click from event on fetch button, map the input to the endpoint. use concatMap to create a new subscription to ajax with URL using value from user input, catch error but do not end main sub
fromEvent(fetchButton, 'click').pipe(
  map(() => endpointInput.value),
  concatMap(value =>
    ajax(`https://random-data-api.com/api/${value}/random_${value}`).pipe(
      catchError(error => of(`could not fetch data: ${error}`))
    )
  )
).subscribe({
  next: value => console.log(value),
  error: err => console.log('Error:', err),
  complete: () => console.log('Completed')
});
