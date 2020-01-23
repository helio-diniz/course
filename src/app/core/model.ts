export class Course {
  id: number;
  description: string;
  startDate: string;
  finishDate: string;
  amountOfStudents: string;
  category = new Category();

  copy(course: Course) {
    this.id = course.id;
    this.description = course.description;
    this.startDate = course.startDate;
    this.finishDate = course.finishDate;
    this.amountOfStudents = course.amountOfStudents;
  }
}

export class Category {
  id: number;
  decription: string;
}













