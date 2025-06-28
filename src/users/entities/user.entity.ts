import { Course } from "src/courses/entities/course.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";


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

    @OneToMany(() => Course, (course) => course.teacher)
    teacherCourses: Course[];

    @ManyToMany(() => Course, course => course.enrolledUsers)
    @JoinTable()
    enrolledCourses: Course[];

}
