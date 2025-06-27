import { Course } from "src/courses/entities/course.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @Column({default: "student"})
    role: "student" | "admin" | "teacher"

    @ManyToMany(() => Course, course => course.enrolledUsers)
    @JoinTable()
    enrolledCourses: Course[];

}
