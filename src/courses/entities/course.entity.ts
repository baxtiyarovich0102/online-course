import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { CourseModule } from 'src/modules/entities/module.entity';


@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column()
  teacher: string;

  @Column()
  category: string;

  @Column()
  level: string;

  @OneToMany(() => CourseModule, module => module.course)
  modules: CourseModule[];

  @ManyToMany(() => User, user => user.enrolledCourses)
enrolledUsers: User[];

}
