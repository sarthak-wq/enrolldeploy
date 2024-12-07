# About 🚀

This Repo is for the final project!

## Project Title
### EnrollAI

## Project Description
```
Our AI-powered course registration platform simplifies the academic planning process by helping students
select courses that align with their academic goals and career aspirations. Using smart algorithms, the
platform suggests personalized course pathways based on department guidelines, prerequisites, and individual
professional objectives, ensuring an efficient and seamless registration experience. With intuitive semester
planning, real-time prerequisite validation, students can confidently chart their path to success while
staying on track for graduation.
```
### Team Member Details

Name: Rutwik Ganagi  
Email Id: ganagi.r@northeastern.edu

Name: Trivikram Bhavesh Budhabhatti    
Email Id: budhabhatti.t@northeastern.edu

Name: Sarthak Deshmukh  
Email Id: deshmukh.sar@northeastern.edu

Name: Payal Jadhav  
Email Id: jadhav.pay@northeastern.edu

# Domain Model for EnrollAI

```mermaid
---
title: EnrollAI
---

classDiagram

  %% User Role Hierarchy
  class User {
    +String id
    +String name
    +String email
    +String role
  }

  class Student {
    +String firstName
    +String lastName
    +List<CourseEnrollment> enrolledCourses
    +enrollInCourse(CourseOffer)
    +getRegisteredCourses()
    +useCourseRecommendationBot()
  }

  class Faculty {
    +String firstName
    +String lastName
    +List<CourseOffer> coursesTaught
    +addCourse(CourseOffer)
    +removeCourse(CourseOffer)
    +viewRegisteredStudents(CourseOffer)
  }

  class Admin {
    +String firstName
    +String lastName
    +manageStudentAccounts()
    +manageFacultyAccounts()
    +manageCourses()
  }

  %% Enumeration for Semester (Value Object)
  class Semester {
    <<enumeration>>
    SPRING
    SUMMER
    FALL
  }

  %% Term Class (Value Object)
  class Term {
    <<value_object>>
    +Integer year
    +Semester semester
    +getTermString(): String
    +isFutureTerm(): Boolean
    +isSameTerm(Term): Boolean
  }

  %% Course Class
  class Course {
    +String name
    +String courseCode
    +List<CourseOffer> offeredCourses
    +List<Course> prerequisites
    +addPrerequisite(Course)
    +removePrerequisite(Course)
    +hasPrerequisite(Course): Boolean
    +isOfferedInTerm(Term): Boolean
  }

  %% Course Offer Class (specific offering for a term)
  class CourseOffer {
    +Course course
    +Term term
    +String instructor
    +Integer maxSeats
    +Integer currentSeats
    +addStudent(Student)
    +removeStudent(Student)
    +getRegisteredStudents()
  }

  %% Enrollment Class
  class CourseEnrollment {
    +Student student
    +CourseOffer courseOffer
    +String enrollmentStatus
    +isStudentEnrolled(): Boolean  
    +isValidEnrollment(): Boolean  
    +getEnrollmentDetails(): String  
  }

  %% Chatbot Class (for course recommendations)
  class CourseRecommendationBot {
    +recommendCourses(Student)
    +getPrerequisiteBasedSuggestions(Course)
    +getProgramBasedSuggestions(Student)
  }

  %% Department Class
  class Department {
    <<value object>>
    +String name
    +List<Course> offeredCourses
    +List<Faculty> facultyMembers
    +addCourse(Course)
    +addFaculty(Faculty)
  }

  %% Relationships

  %% User Hierarchy
  User <|-- Student
  User <|-- Faculty
  User <|-- Admin

  %% Enrollment Relationships
  CourseEnrollment *-- Student
  CourseEnrollment *-- CourseOffer
  CourseOffer *-- Course
  CourseOffer *-- Term
  Term *-- Semester

  %% Faculty to Course Offer
  Faculty "1" *-- "0..*" CourseOffer : teaches

  %% Faculty manages Course Offerings
  Admin "1" --> "0..*" Faculty : manages
  Admin "1" --> "0..*" Student : manages

  %% Faculty in Department
  Department "1" *-- "0..*" Faculty : employs

  %% Courses belong to Departments
  Department "1" *-- "0..*" Course : offers

  %% Chatbot Dependency on Student
  CourseRecommendationBot --> Student : recommends to
  CourseRecommendationBot --> Course : analyzes
  CourseRecommendationBot --> Term : considers

  %% Course Prerequisite Relationship
  Course "0..*" --> "0..*" Course : prerequisite for
```
