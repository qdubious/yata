import { Injectable } from '@angular/core';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { Todo } from './model.types';
import * as Q from 'q';

export const KEY_TODOS = 'todos.list';

@Injectable()
export class TodoService {

  todos: Todo[] = [];

  constructor(private localStorage: AsyncLocalStorage) {
  }

  async all(): Promise<Todo[]> {
    const defer = Q.defer<Todo[]>();
    this.localStorage.getItem(KEY_TODOS)
      .subscribe(defer.resolve, defer.reject);
    return defer.promise;
  }

  get(message: string): Promise<Todo> {
    return this.all()
      .then((todos: Todo[]) => {
        const payload = todos || [];
        const result  = [ ...payload ];
        return result.filter(todo => todo.message === message);
      })
      .then((todos: Todo[]) => {
        let todo = new Todo();
        if (todos.length > 1) {
          console.warn('More than one todo has the same message!', todos);
        }
        if (todos.length === 0) {
          todo.message = 'What can I do for myself, today?';
          todo.date    = new Date();
        } else {
          todo = todos[ 0 ];
        }
        return todo;
      });
  }

  save(obj: Todo): Q.Promise<Todo[]> {
    const defer = Q.defer<Todo[]>();
    this.all()
      .then((todos: Todo[]) => todos ? todos : [])
      .then((todos: Todo[]) => {
        const latest = todos.filter(t => t.message !== obj.message).concat(obj);
        this.localStorage.setItem(KEY_TODOS, latest)
          .subscribe(
            () => defer.resolve(latest),
            (err) => defer.reject(err));
      });
    return defer.promise;
  }

  remove(message: string): Q.Promise<Todo> {
    const defer = Q.defer<Todo>();
    this.get(message)
      .then((todo: Todo) => {
        if (!todo) {
          return todo;
        }
        this.localStorage.getItem(KEY_TODOS)
          .subscribe((todos: Todo[]) => {
            const thinner = todos.filter(t => t.message !== todo.message);
            this.localStorage.setItem(KEY_TODOS, thinner)
              .subscribe(() =>
                  defer.resolve(todo),
                (err) => defer.reject(err)
              );
          });
      });
    return defer.promise;
  }
}
