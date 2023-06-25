import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  sortBy =new BehaviorSubject<string>('Most Upvotes')
  filterBy =new BehaviorSubject<string>('All')
  constructor() { }
  getSortBy() {
    return this.sortBy.asObservable()
  }
  getFilterBy() {
    return this.filterBy.asObservable()
  }

}
