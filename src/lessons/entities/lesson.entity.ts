import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CourseModule } from 'src/modules/entities/module.entity';

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => CourseModule, module => module.lessons, { onDelete: 'CASCADE' })
  module: CourseModule;
}
