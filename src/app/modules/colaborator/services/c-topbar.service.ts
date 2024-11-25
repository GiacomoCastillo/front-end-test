import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CTopbarService {

  menus = [
    { title: 'Account',
      route: 'account',
      icon: 'fa-regular fa-user',
      active: false,
      type: 'dropdown',
      children:[]
    },
    { title: 'Tasks',
      route: 'task',
      icon: 'fa-solid fa-pen',
      active: false,
      type: 'dropdown',
      children:[]
    },
    { title: 'Log Out',
      route: 'log-out',
      icon: 'fa-solid fa-arrow-right-from-bracket',
      active: false,
      type: 'dropdown',
      children:[]
    }
  ]

  constructor() { }
}
