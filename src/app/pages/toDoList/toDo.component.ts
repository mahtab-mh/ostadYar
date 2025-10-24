import { Component, input, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { todoItem } from '../../app.model';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';

@Component({
    selector: 'selector-name',
    templateUrl: 'toDo.component.html',
    imports:[InputTextModule,ButtonModule,FormsModule,DividerModule,CheckboxModule,DialogModule]
})

export class todoComponent {
    todoList:todoItem[]=[]
    newTask:string=''
    checked !:boolean 
    visible: boolean=false;
    newtitel!:string

    addTask():void{
        if(this.newTask.trim() !== ''){
         const nowTodoItem :todoItem = {
               id: Date.now(),
               task:this.newTask,
               completed:false,
            
            }

            this.todoList.push(nowTodoItem)
            this.newTask=''
            
    }
    
    }
    isComplitedin(index:number):void{
        this.todoList[index].completed = !this.todoList[index].completed
        console.log(this.todoList)

    }
    deleteTask(id:number):void{
        this.todoList=this.todoList.filter(item => item.id !== id)
        console.log(this.todoList)
        
    }
    isEditing(todo:todoItem){
        todo.isediting=true
        this.visible=true
    }
    save(todo:todoItem,newtitle:string){
        if (newtitle.trim()){
            todo.task=newtitle
            console.log(this.todoList)

        }
        todo.isediting=false
        this.visible=false
    }
    cancel(todo:todoItem){
        todo.isediting=false
        this.visible=false

    }

}
