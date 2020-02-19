export class Course {
  id: number;
  description: string;
  startDate: Date;
  finishDate: Date;
  amountOfStudents: number;
  category = new Category();
}

export class Category {
  id: number;
  description: string;
}












