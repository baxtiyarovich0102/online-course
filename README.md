Online Course Management System (Backend)

NestJS + PostgreSQL asosida ishlab chiqilgan Online Kurslarni Boshqarish Tizimi. Foydalanuvchilar kurslarga yozilishi, mashg'ulotlarni ko'rishi va topshiriqlarni topshirishi mumkin. Admin esa kurslar va foydalanuvchilarni boshqaradi.

📄 Texnologiyalar

Backend: NestJS (TypeScript)

Ma'lumotlar ombori: PostgreSQL

ORM: TypeORM

Autentifikatsiya: JWT (Access & Refresh token)

Konteynerizatsiya: Docker + docker-compose

Versiya nazorati: Git + GitHub

Test: Swagger, Postman

⚖️ Role'lar

Student: Kurslarga yoziladi, darslarni ko'radi, topshiriq topshiradi

Admin: Kurs, modul, darslarni qo'shadi/yemalaydi/o'chiradi

Teacher: Topshiriqlarga baho qo'yadi

✉️ API Routelar

Auth

POST /auth/register — Ro'yxatdan o'tish

POST /auth/login — Kirish

POST /auth/refresh — Access tokenni yangilash

Courses

GET /courses — Kurslar ro'yxati

POST /courses — Kurs qo'shish (admin)

PUT /courses/:id — Kursni tahrirlash (admin)

DELETE /courses/:id — Kursni o'chirish (admin)

Modules & Lessons

GET /courses/:courseId/modules — Kurs modullari

GET /modules/:moduleId/lessons — Modul darslari

Enrollment

POST /courses/:id/enroll — Kursga yozilish (student only)

Assignments

POST /assignments/:moduleId — Topshiriq yuborish

GET /assignments/my — O'z topshiriqlarini ko'rish

Results

GET /results — Baholangan assignmentlar (student)

PUT /assignments/:id/grade — Teacher tomonidan baholash

🚀 Loyihani ishga tushirish

1. Klonlash

git clone https://github.com/baxtiyarovich0102/online-course.git
cd online-course

2. .env fayl yaratish

.env fayl ichida quyidagilar bo'lishi kerak:

DATABASE_URL=postgres://postgres:postgres@db:5432/online-course
JWT_ACCESS_SECRET=youraccesstokensecret
JWT_ACCESS_EXPIRES=1h
JWT_REFRESH_SECRET=yourrefreshtokensecret
JWT_REFRESH_EXPIRES=7d

3. Docker bilan ishga tushirish

docker-compose up --build

4. Swagger API

Swagger: http://localhost:3000/api

📅 CI/CD

GitHub Actions orqali:

Lint

Test

Build

EC2 serverga deploy (agar sozlansa)

🚫 Role-Based Access

JWT token ichidagi role orqali Guardlar orqali himoya qilinadi:

Admin: Kurslarni boshqaradi

Student: Kursga yoziladi va darslardan foydalanadi
