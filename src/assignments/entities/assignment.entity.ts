import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CourseModule } from 'src/modules/entities/module.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('assignments')
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => User, user => user.assignments)
  user: User;

  @ManyToOne(() => CourseModule, module => module.assignments)
  module: CourseModule;

  @Column({ default: false })
  isGraded: boolean;

  @Column({ type: 'int', nullable: true })
  score: number;
}
