# online-tutoring-API

{
  "openapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "online tutoring app",
    "license": {
      "name": "MIT"
    }
  },

paths:
  
POST http://localhost:8080/api/v1/signup

parameters:
- schema:
{"firstname":"admin1", 
"lastname": "amAdmin", 
"username": "admin1", 
"email": "admin@gmail.com", 
"password": "admin", 
"role": "admin"
	
}

description: you can signup as a new user with either admin or tutor or none and it is set to default: student
status: 200 Ok
response: 
{
    "status": true,
    "message": "User registered successfully"
}

-----------------------------------------------------------------------------------------------------------------
path: POST http://localhost:8080/api/v1/signin

parameters:
schema:
{"email": "admin@gmail.com", 
"password": "admin"
	
}

status: 200 Ok
response:
{
    "_id": "5eba3c0b1b06403a406f8c8f",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsIl9pZCI6IjVlYmEzYzBiMWIwNjQwM2E0MDZmOGM4ZiIsImlhdCI6MTU4OTI2MzY4NiwiZXhwIjoxNTg5MzUwMDg2fQ.CTjvUiI8IsojhcXsYcHV4ujyae7EVlxevia3cIF_buw"
}

description: signin user and a token is generated

//create a category without token 
// message: unauthorized
// response: 401 unauthorized

// create a category , only admin has access to this route


summary: a token is passes to the Headers parameter

x-access-token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsIl9pZCI6IjVlYmEzYzBiMWIwNjQwM2E0MDZmOGM4ZiIsImlhdCI6MTU4OTI2MzY4NiwiZXhwIjoxNTg5MzUwMDg2fQ.CTjvUiI8IsojhcXsYcHV4ujyae7EVlxevia3cIF_buw"

// verify if admin

--------------------------------------------------------------------------------------------------------------------------

POST http://localhost:8080/api/v1/category

// pass the name of the category to the body as key and value

{
"name": "primary"
}

status: 200 OK
response: 

{
    "subjects": [],
    "tutors": [],
    "students": [],
    "_id": "5eba74612e93ab38f0508634",
    "name": "primary"
}

//if category not primary or jss or sss
//404 not found
// response: {"message": "sorry we can only create category of either primary, sss or jss"}

//if category already existed
// response: {"message": "This category already exist"}

--------------------------------------------------------------------------------------------------------------------------

//create a subject under a category by categoryId
POST http://localhost:8080/api/v1/subject/:id

example: http://localhost:8080/api/v1/subject/5eba74612e93ab38f0508634

request body: {
"name": "math101"
}

response: 
{
    "subjects": [
        {
            "_id": "5eba750d2e93ab38f0508635",
            "name": "math101",
            "timeStamp": "2020-05-12T10:06:05.613Z",
            "__v": 0
        }
    ],
    "tutors": [],
    "students": [],
    "_id": "5eba74612e93ab38f0508634",
    "name": "primary",
    "__v": 1
}

--------------------------------------------------------------------------------------------------------------------------

//update a subject in a category by id

PATCH http://localhost:8080/api/v1/subject/:subjectId

example: http://localhost:8080/api/v1/subject/5eba750d2e93ab38f0508635

req.body :{
"name": "french301"
}

response: {
    "message": "subject updated successfully",
    "subject": {
        "_id": "5eba750d2e93ab38f0508635",
        "name": "FREN301",
        "timeStamp": "2020-05-12T10:06:05.613Z",
        "__v": 0
    }
}

-------------------------------------------------------------------------------------------------

//get all tutors

GET http://localhost:8080/api/v1/tutors


response: 
{
    "status": true,
    "data": [
        {
            "categories": [],
            "subjects": [],
            "lessons": [],
            "role": "tutor",
            "_id": "5ebae2d13543f82340a5dd87",
            "email": "tutor1@gmail.com",
            "password": "$2a$12$9JtOc88nqQf0jBSYg1v.2.wHXzUmZr7CY/AGUhihBZM8zG6iCWzdi",
            "username": "tutor1",
            "firstname": "tutor1",
            "lastname": "amTutor1",
            "createdAt": "2020-05-12T17:54:25.702Z",
            "updatedAt": "2020-05-12T17:54:25.702Z",
            "__v": 0
        }
    ]
}

--------------------------------------------------------------------------------------------------------------------------
//get tutor by id by passing in tutorId

GET http://localhost:8080/api/v1/tutor/:tutorId
example:http://localhost:8080/api/v1/tutor/5ebae2d13543f82340a5dd87

response: 

{
    "status": true,
    "data": {
        "categories": [],
        "subjects": [],
        "lessons": [],
        "role": "tutor",
        "_id": "5ebae2d13543f82340a5dd87",
        "email": "tutor1@gmail.com",
        "password": "$2a$12$9JtOc88nqQf0jBSYg1v.2.wHXzUmZr7CY/AGUhihBZM8zG6iCWzdi",
        "username": "tutor1",
        "firstname": "tutor1",
        "lastname": "amTutor1",
        "createdAt": "2020-05-12T17:54:25.702Z",
        "updatedAt": "2020-05-12T17:54:25.702Z",
        "__v": 0
    }
}
--------------------------------------------------------------------------------------------------------------------------
// delete tutor by category

DELETE :http://localhost:8080/api/v1/tutor/:tutorId

example:

http://localhost:8080/api/v1/tutor/5ebae4223543f82340a5dd88

response: {
    "message": "Tutor Deleted",
    "user": {
        "n": 1,
        "opTime": {
            "ts": "6826019213186957313",
            "t": 3
        },
        "electionId": "7fffffff0000000000000003",
        "ok": 1,
        "$clusterTime": {
            "clusterTime": "6826019213186957313",
            "signature": {
                "hash": "LWn1WwoD3kuhUhYuiPD/3h+Sik8=",
                "keyId": "6816048459494195203"
            }
        },
        "operationTime": "6826019213186957313",
        "deletedCount": 1
    }
}
--------------------------------------------------------------------------------------------------------------------------
//book a lesson 
POST http://localhost:8080/api/v1/lesson

request body: {"name": "lesson1","subjectName":"french201", 
"tutorName": "tutor1", 
"studentName": "student2"

}

response: 

{
    "status": true,
    "message": "lesson booked successfully.",
    "lesson": {
        "_id": "5ebb00315886ef1374af6fa6",
	"name": "lesson1",
        "studentName": "student2",
        "subjectName": "french201",
        "tutorName": "tutor1",
        "time": "2020-05-12T19:59:45.202Z",
        "__v": 0
    }
}

--------------------------------------------------------------------------------------------------------------------------
// retrieve all registered lesson
GET http://localhost:8080/api/v1/lessons

response:

[
    {
        "_id": "5eb3b7065ff6e334040940ae",
        "type": "lesson1",
        "username": "admin",
        "time": "2020-05-07T07:21:42.021Z",
        "__v": 0
    },
    {
        "_id": "5ebaff5b6e912712988d9fb7",
        "studentName": "student2",
        "subjectName": "eng101",
        "tutorName": "tutor1",
        "time": "2020-05-12T19:56:11.672Z",
        "__v": 0
    },
    {
        "_id": "5ebb00315886ef1374af6fa6",
        "studentName": "student2",
        "subjectName": "french201",
        "tutorName": "tutor1",
        "time": "2020-05-12T19:59:45.202Z",
        "__v": 0
    }
]
--------------------------------------------------------------------------------------------------------------------------
//retrieve a lesson by its id

GET http://localhost:8080/api/v1/lesson/:id
example: http://localhost:8080/api/v1/lesson/5ebaff5b6e912712988d9fb7

response: {
    "_id": "5ebaff5b6e912712988d9fb7",
    "studentName": "student2",
    "subjectName": "eng101",
    "tutorName": "tutor1",
    "time": "2020-05-12T19:56:11.672Z",
    "__v": 0
}
--------------------------------------------------------------------------------------------------------------------------
//update a lesson
PATCH http://localhost:8080/api/v1/lesson/:id
example: http://localhost:8080/api/v1/lesson/5ebb0422c175e12b744d56ab

request body: {"name":"lesson121"
}
response: 

{
    "message": "Subject updated successfully!"
}
--------------------------------------------------------------------------------------------------------------------------
//delete a lesson

DELETE: http://localhost:8080/api/v1/lesson/:id

example:
http://localhost:8080/api/v1/lesson/5ebb0422c175e12b744d56ab

response:
{
    "message": "Lesson Deleted!"
}

--------------------------------------------------------------------------------------------------------------------------

//get all category

path: GET http://localhost:8080/api/v1/categories

response: 
[
    {
        "subjects": [
            "5eba750d2e93ab38f0508635",
            "5eba75342e93ab38f0508637",
            "5eba7c385976c4306c429d59"
        ],
        "tutors": [],
        "students": [],
        "_id": "5eba74612e93ab38f0508634",
        "name": "primary",
        "__v": 3
    },
    {
        "subjects": [],
        "tutors": [],
        "students": [],
        "_id": "5ebb18bb09178e247cc78d4e",
        "name": "jss",
        "__v": 0
    },
    {
        "subjects": [],
        "tutors": [],
        "students": [],
        "_id": "5ebb18c809178e247cc78d4f",
        "name": "sss",
        "__v": 0
    }
]

-------------------------------------------------------------------------------------------------------------------------
// get a subject in a category

path: GET http://localhost:8080/api/v1/category/subjectId

parameters: {
"subjectId": "5eba75342e93ab38f0508637",
"categoryName": "primary"
}
response:
{
    "status": true,
    "message": [
        {
            "_id": "5eba75342e93ab38f0508637",
            "name": "eng101",
            "timeStamp": "2020-05-12T10:06:44.635Z",
            "__v": 0
        }
    ]
}

-------------------------------------------------------------------------------------------------------------------

//get a subject by its name
path: GET http://localhost:8080/api/v1/subjectName/:name
example: http://localhost:8080/api/v1/subjectName/eng101
response:{
    "status": true,
    "message": [
        {
            "_id": "5eba75342e93ab38f0508637",
            "name": "eng101",
            "timeStamp": "2020-05-12T10:06:44.635Z",
            "__v": 0
        }
    ]
}

------------------------------------------------------------------------------------------------------------------

//get a tutor by tutorname

path: GET: http://localhost:8080/api/v1/tutorName/:name
example:http://localhost:8080/api/v1/tutorName/tutor1
response: 
{
    "status": true,
    "message": [
        {
            "categories": [],
            "subjects": [],
            "lessons": [
                "5ebaff5b6e912712988d9fb7",
                "5ebb00315886ef1374af6fa6",
                "5ebb0422c175e12b744d56ab",
                "5ebb06b7b31b8222f45dfbcf"
            ],
            "role": "tutor",
            "_id": "5ebae2d13543f82340a5dd87",
            "email": "tutor1@gmail.com",
            "password": "$2a$12$9JtOc88nqQf0jBSYg1v.2.wHXzUmZr7CY/AGUhihBZM8zG6iCWzdi",
            "username": "tutor1",
            "firstname": "tutor1",
            "lastname": "amTutor1",
            "createdAt": "2020-05-12T17:54:25.702Z",
            "updatedAt": "2020-05-12T20:27:35.807Z",
            "__v": 4
        }
    ]
}
description: get tutor by name and check if the tutor exist else empty array

-----------------------------------------------------------------------------------------------------------------

//get subject by category

path: GET: http://localhost:8080/api/v1/category/:name

example: http://localhost:8080/api/v1/category/jss

response: {
    "subjects": [
        "5eba750d2e93ab38f0508635",
        "5eba75342e93ab38f0508637",
        "5eba7c385976c4306c429d59"
    ],
    "tutors": [],
    "students": [],
    "_id": "5eba74612e93ab38f0508634",
    "name": "primary",
    "__v": 3
}




