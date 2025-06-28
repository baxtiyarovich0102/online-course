import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Course } from 'src/courses/entities/course.entity';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { Assignment } from 'src/assignments/entities/assignment.entity';

@Entity('modules')
export class CourseModule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Course, course => course.modules, { onDelete: 'CASCADE' })
  course: Course;

  @OneToMany(() => Assignment, assignment => assignment.module)
  assignments: Assignment[];

  @OneToMany(() => Lesson, lesson => lesson.module)
  lessons: Lesson[];
}
