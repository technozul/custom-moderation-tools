/**
 * AsyncArray module
 * handle asynchronous filter of array
 * make delay foreach array loop
 */
export class AsyncArray /*extends Array*/ {
   constructor(arr) {
      this.data = arr; // In place of Array subclassing
   }

   filterAsync(predicate) {
      // Take a copy of the array, it might mutate by the time we've finished
      var data = this.data;

      if (data.length > 0) {
         // Transform all the elements into an array of promises using the predicate
         // as the promise
         return Promise.all(data.map((element, index) => predicate(element, index, data)))
         // Use the result of the promises to call the underlying sync filter function
         .then(result => {
            return data.filter((element, index) => {
               return result[index];
            });
         });
      } else {
         // Transform all the elements into an array of promises using the predicate
         // as the promise
         return data.then(function (data) {
            return Promise.all(data.map((element, index) => predicate(element, index, data)))
            // Use the result of the promises to call the underlying sync filter function
            .then(result => {
               return data.filter((element, index) => {
                  return result[index];
               });
            });
         });
      }
   }
}
