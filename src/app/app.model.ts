 export  interface  postResponsModel{
    title:string,
    price:number,
    description:string,
    image:string,
    category:string

 }

 export interface todoItem{
   id:number
   task:string
   completed:boolean
   isediting ?: boolean

 }
 export interface examItam{
  id:number
  name:string
  finish:boolean
  date:date[]
  vote:number

  
 }
export interface date{
  y:number
  m:number
  d:number
}
export interface Student {
  firstName: string;
  lastName: string;
  studentNumber: bigint;
  username: string;
}
export interface Course {
  id: number;
  name: string;
  code: string;
  teacher: string;
  enrolledCount: number;
}
export interface Exam {
  id: number;
  courseName: string;
  examName: string;
  startDate: string;
  endDate: string;
  roomName: string;
}
