import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TodoService } from '../shared/todo.service';
import { Todo } from '../shared/model.types';

@Component({
  selector:    'app-dash',
  templateUrl: './dash.component.html',
  styleUrls:   [ './dash.component.scss' ]
})
export class DashComponent implements OnInit {

  todos: Todo[];

  @ViewChild('todoInput') todoInput: ElementRef;

  constructor(private todoService: TodoService) {
    this.todos = [];
  }

  ngOnInit() {
    this.todoService.all()
      .then(todos => this.todos = [ ...todos ]);
  }

  addTodo(message: string) {
    const todo                         = new Todo();
    todo.message                       = message;
    this.todos                         = this.todos.filter(t => t.message !== message).concat(todo);
    this.todoInput.nativeElement.value = '';
    this.todoService.save(todo)
      .then(todos => this.todos = [ ...todos ]);
  }

  removeTodo(message: string) {
    this.todos = this.todos.filter(t => t.message !== message);
    this.todoService.remove(message)
      .then(() => {});
  }
}
