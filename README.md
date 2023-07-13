## API DOCUMENTATION

This document provides information about the API endpoints available in this Project.

 1. `POST /signup` this api is used to create a new user and the dataschema is use POST request with this api:

    {
      "name": "NAME",
      "email": "EMAIL ID",
      "password": "PASSWORD",
      "role": "participant or admin"
    }

data example:

    {
      "name": "Deepak Mandal",
      "email": "dm65931@gmail.com",
      "password": "1234",
      "role": "participant"
    }
  ![Screenshot 2023-07-13 234418](https://github.com/marchinghunter/codingplatform/assets/29193764/6faaf7f0-7418-4b5f-a2e4-5d13c3be67a1)

 2. `POST /signin` this api is used to sign in an existing user and the dataschema is use POST request with this api:

   

 

        {
          "email": "EMAIL ID",
          "password": "PASSWORD",
        }
![Screenshot 2023-07-13 234517](https://github.com/marchinghunter/codingplatform/assets/29193764/b8cb7d71-41a6-4f51-b1bb-6efdd112d784)
data example:

    {
      "email": "dm65931@gmail.com",
      "password": "1234",
    }


3. `POST http://localhost:5000/addquestion` this api is used to add new question in the database and also in sphereengine api use POST request with this api:

>     {
>       "questionname": "Test Question",
>       "questiondescription": "Test Description"
>     }
![Screenshot 2023-07-13 234712](https://github.com/marchinghunter/codingplatform/assets/29193764/3e79ceaf-59b5-458f-b52c-565fec0819ac)
both of them are required to enter by admin

4. `PUT http://localhost:5000/editquestion` this api is used to edit existing question in the database and also in sphereengine api use PUT request with this api. You also need to use the question id to edit the questions which will be given by addquestion api when adding new question:
for example

        {
        "id":116862,
        "name": "Updated Question 1",
        "description": "Updated Question 1",
        "nameflag":true
        "descriptionflag":true
        }
![Screenshot 2023-07-13 234828](https://github.com/marchinghunter/codingplatform/assets/29193764/411cd672-2b9b-4483-a52d-d9233e3595aa)
if admin does not want to update description he needs to set descriptionflag false and vice versa for name flag

5. `DELETE http://localhost:5000/deletequestion` this api is used to delete existing question in the database and also in sphereengine api and it will also delete all testcases related to this question use DELETE request with this api. You also need to use the question id to delete the questions which will be given by addquestion api when adding new question:

        {
        "id":116862
        }
![Screenshot 2023-07-13 235002](https://github.com/marchinghunter/codingplatform/assets/29193764/55dc6d14-957d-4d55-95b3-87b7836d9161)
6. `POST http://localhost:5000/addtestcase` this api is used to add testcases for existing question in the database and also in sphereengine api use POST request with this api. You also need to use the question id to add the test cases for specific questions which will be given by addquestion api when adding new question:
example data:

        {
        "id":116822,
        "input": "10 20", 
        "output": "30"
        }
![Screenshot 2023-07-13 235131](https://github.com/marchinghunter/codingplatform/assets/29193764/84b559e4-993f-4f08-882e-b89b71ef2e68)
7. `POST http://localhost:5000/submission` this api is used to create new submission by user althought user can only submit JAVA code through this api and user also needs to enter the Question ID it will also send user his/her question response after submitting this user needs to wait for 5 seconds so that code gets executed and api can fetch response:

        {
            "problemId": problemId,
            "source": "sourcecode",
        }
example:

    {
      "problemId": 116587,
      "source":  "import java.util.*;\nimport java.lang.*;\nimport java.io.*;\nclass Main\n{\n\tpublic static 					void main (String[] args) throws java.lang.Exception\n\t{\n\t\tint a,b;\n\t\tScanner input = new Scanner(System.in);\n\t\ta= input.nextInt();\n\t\tb= input.nextInt();\n\t\tSystem.out.print(a+b);\n\t}\n}"
    }
![Screenshot 2023-07-13 235219](https://github.com/marchinghunter/codingplatform/assets/29193764/368b716a-ab1f-4017-91c8-be6702480b75)
8. `POST http://localhost:5000/checksubmission` this api is used to check user submitted response user needs to send submissionid aswell which will be given by submission api:
example data:

        {
        "submissionid":"53571193"
        }
![Screenshot 2023-07-13 235323](https://github.com/marchinghunter/codingplatform/assets/29193764/5644d7b6-2e57-46d1-85c3-c65aa8c0c1ca)

Live Hosted on Render site is:- https://codingplatform.onrender.com
when you want to call on api use this like example:- https://codingplatform.onrender.com/signup etc.
