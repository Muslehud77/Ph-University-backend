import { Router } from "express";
import { studentRoutes } from './../modules/student/student.route';
import { userRoutes } from "../modules/user/user.route";
import { semesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { academicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { academicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route";
import { adminRoutes } from "../modules/admin/admin.route";
import { facultyRoutes } from "../modules/faculty/faculty.route";
import { courseRoutes } from "../modules/course/course.route";
import { semesterRegistrationRoutes } from "../modules/semesterRegistration/semesterRegistration.route";

const router = Router()


const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/students',
    route: studentRoutes,
  },
  {
    path: '/academic-semesters',
    route: semesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: academicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: academicDepartmentRoutes,
  },
  {
    path: '/admins',
    route: adminRoutes,
  },
  {
    path: '/faculties',
    route: facultyRoutes,
  },
  {
    path: '/courses',
    route: courseRoutes,
  },
  {
    path: '/semester-registrations',
    route: semesterRegistrationRoutes,
  },
];


moduleRoutes.forEach(route=>router.use(route.path,route.route))



export default router