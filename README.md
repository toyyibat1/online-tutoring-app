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
  "servers": [
    {
      "url": "http://petstore.swagger.io/v1"
    }
  ],
  "paths": {
    "/signup": {
      post:
      summary: Post user details to the database
      tags:
        - users
      responses:
        '201':
          description: OK - User was registered successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/user'
              examples:
                example-1:
                  value:
                    orderId: 674
                    items:
                    first_name: admin,
                    last_name: abdul,
                    username: admin12,
                    email: admin12@gmail.com,
                    password: password,
                    roles: ["admin"]
    }
      "/sigin": {
          post:
      summary: request for user details from the database
      tags:
        - users
      responses:
        '201':
          description: OK - User was registered successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/user'
              examples:
                example-1:
                  value:
                    username: admin12,
                    password: password
    }
  },
  "http://localhost:8080/api/v1": {
    "/lesson/create": {
      post:
      summary: Post lesson details to the database(only admin and student can create a lesson)
      tags:
        - users
      responses:
        '200':
          description: {
              "_id": "5eb1584c9d96de34ccd022ba",
                "type": "lesson 6 ",
                "username": "student1",
                "time": "2020-05-05T12:13:00.189Z",
                "__v": 0
          }
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/user'
              examples:
                example-1:
                  value:
                    {
                    "type": "lesson 2 ",
                    "username": "student1"
                    }
    }
      "/lessons": {
          get:
      summary: request for lesson details from the database(only admin can retrieve a lesson)
      tags:
        - users
      responses:
        '200 OK':
          description: {
              "_id": "5eb15360b9f9110e44f35ce0",
            "type": "lesson 1 ",
            "username": "admin",
            "time": "2020-05-05T11:52:00.777Z",
            "__v": 0
          }
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/user'
  },

  "/lesson/:lessonId": {
          update:
      summary: request for lesson to be updated by lessonId from the database(only admin can update a lesson)
      tags:
        - users
      responses:
        '200 OK':
          description: Lesson Updated
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/user'
  },
  "/lesson/:lessonId": {
          delete:
      summary: request for lesson to be deleted by lessonId from the database(only admin can update a lesson)
      tags:
        - users
      responses:
        '200 OK':
          description: Lesson Updated
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/user'
  },
  "category/subject/:categoryId": {
          post:
      summary: create a subject in a category by categoryId(5eafe9ebe7c7332448e27d84) and can be created by either admin or a tutor
            tags:
        - users
      responses:
        '200 OK':
          description:{
        "subjects": [
        "5eafebde0e6e2a1724f4bdec",
        "5eb04710c93f1c2a90406bed",
        "5eb16bdb5a87b43148038382"
    ],
    "_id": "5eafe9ebe7c7332448e27d84",
    "name": "primary",
    "__v": 3
  }
  "components": {
    "schemas": {
      "User": {
        "type": "object",
        "required": [
          "id",
          "name"
        ],
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "name": {
            "type": "string"
          },
          "tag": {
            "type": "string"
          }
        }
      },
      "Error": {
        "type": "object",
        "required": [
          "code",
          "message"
        ],
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32"
          },
          "message": {
            "type": "string"
          }
        }
      }
    }
  }
}