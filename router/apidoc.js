/**this file is only meant for api documentaion */
/**Sign up route */
router.post("/signup", signupParamValidation, signUpControl);
/**
 * @api {post} /api/v1/user/register Register a new user
 * @apiVersion 0.0.1
 * @apiGroup UserManagement
 *
 * @apiParam {String} firstName Name of User
 * @apiParam {String} email Email of User
 * @apiParam {String} username UserName of User
 * @apiParam {String} password Password needed for login
 * @apiParamExample {json} Sign-Up Sample Request
 * {
        "name":"George",
        "email":"ge@api.com",
        "username":"gory",
        "password":"Sdgfhye@123"
    }
 * @apiSuccessExample {json} Sign-Up Success Response
 * {
        "error": false,
        "status": 200,
        "message": "User Created Sucess",
        "data": {
            "userId": "te2T1TAGD",
            "name": "George",
            "email": "ge@api.com",
            "username": "gory",
        }
    }
 *  @apiParamExample {json} Sign-Up Invalid Params Request
 *  {
        "name":"George",
        "email":"ge@api.com",
        "password":"Sjghgh@123"
    }
 *  @apiErrorExample {json} Sign-Up Invalid Params Response
    {
        "error": true,
        "status": 400,
        "message": "Not valid Input Params",
        "data": [
            "\"username\" is required"
        ]
    }
 *  @apiParamExample {json} Sign-Up Invalid User Request
 *  {
      "name":"George",
      "email":"ge@api.com",
      "username":"gory",
      "password":"Aasdkjte123"
    }
    @apiErrorExample {json} Sign-Up Invalid User Request
 *   {
        "error": true,
        "status": 401,
        "message": "we already have you",
        "data": "ge@api.com"
      }
 */
/**login route */
router.post("/user/login", loginParamValidation, loginControl);
/**
 * @api {post} /api/v1/user/login Login a user
 * @apiVersion 0.0.1
 * @apiGroup UserManagement
 *
 * @apiParam {String} loginId Email/Username of User
 * @apiParam {String} password Password for login
 * @apiParamExample {json} Login Sample Request
 * {
      "loginId":"sb@api.com",
      "password":"saurabh123123"
    }
 * @apiSuccessExample {json} Sign-Up Success Response
 * {
       "error": false,
       "status": 200,
       "message": "Login Sucess",
       "data": {
          "userId": "_ofyQhK9u",
          "name": "Saurabh Bharti",
          "email": "sb@api.com",
          "username": "sbhbp",
          "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IlRyRXNUNFVEZiIsImlhdCI6MTU5NjcwOTQxODE1NSwiZXhwIjoxNTk2ODgyMjE4LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJrYW5iYW5Cb2FyZCIsImRhdGEiOnsiY3JlYXRlZE9uIjoiMjAyMC0wOC0wNlQxMDoxNTozMy41NjFaIiwiZnJpZW5kcyI6W10sInVzZXJJZCI6IlFXTHg4Y09jSiIsImZpcnN0TmFtZSI6Im5hbmN5IiwibGFzdE5hbWUiOiJzYW1zIiwiZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsIm1vYmlsZSI6IjIyMzQ2NjM3MjQyMSJ9fQ.Qktve9MPXunk4dn5ETDsZOpEFrG_dnwcpIdILWwaXPo"
        }
    }
 *  @apiParamExample {json} Login Invalid User Request
 *  {
       "loginId":"us@gmail.com",
       "password":"saurabh123123"
    }
 *  @apiErrorExample {json} Login Invalid User Response
    {
       "error": true,
       "status": 404,
       "message": "User Not Found",
       "data": "us@gmail.com"
    }
 *  @apiParamExample {json} Login Invalid Password Request
 *  {
       "loginId":"user@gmail.com",
       "password":"saurabh1231"
    }
    @apiErrorExample {json} Login Invalid Password Request
 *  {
       "error": true,
       "status": 401,
       "message": "Authentication Failed",
       "data": null
    }
 */
router.get(
  "/user/social/verify",
  validations.verifySocialValidation,
  users.verifySocialLogin
);
/**
 *@api {post} /api/v1/user/social/verify?email=[email]&name=[name] Verifies a user from social login
 * @apiVersion 0.0.1
 * @apiGroup UserManagement
 *
 * @apiParam {String} email Email  of User from social media
 * @apiParam {String} name Name from social account
 * @apiSuccessExample {json} Social verification Success Response
 * {
    "error": false,
    "status": 200,
    "message": "User Verification Success",
    "data": {
        "userId": "mzEvNEGR6",
        "name": "Saurabh Bharti",
        "email": "sbh@api.com",
        "username": "sbh@api.com",
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6InBJNUZSRFZJUyIsImlhdCI6MTYwNDU2NzUyOTE4MywiZXhwIjoxNjA0NzQwMzI5LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJpVHJhY2tlciIsImRhdGEiOnsidXNlcklkIjoibXpFdk5FR1I2IiwibmFtZSI6IlNhdXJhYmggQmhhcnRpIiwiZW1haWwiOiJzYmhAYXBpLmNvbSIsInVzZXJuYW1lIjoic2JoQGFwaS5jb20ifX0.Ro3oB5YvuNRSU6WjtjGOxVG7T1nuvQg98vZYXvxALkM"
    }
}
 *  @apiParamExample {json} Login Invalid User Request
 *  {
       "loginId":"us@gmail.com",
       "password":"saurabh123123"
    }
 *  @apiErrorExample {json} Login Invalid User Response
    {
       "error": true,
       "status": 404,
       "message": "User Not Found",
       "data": "us@gmail.com"
    }
 *  @apiParamExample {json} Login Invalid Password Request
 *  {
       "loginId":"user@gmail.com",
       "password":"saurabh1231"
    }
    @apiErrorExample {json} Login Invalid Password Request
 *  {
       "error": true,
       "status": 401,
       "message": "Authentication Failed",
       "data": null
    }
 * 
 * 
 * 
 */

/*Create Issue*/
router.post("/issue/create", isAuthorized, taskListValidation, createTaskList);
/**
 * @api {post} /api/v1/issue/create?userId=[userId]&title=[title]&description=[description]&status=[status]&reporter=[reporter]&priority=[priority]&estimates=[estimate]&assignee=[assignee]&watchList=[watchList] Create a Issue
 * @apiVersion 0.0.1
 * @apiGroup IssueManagement
 * @apiParam {String} userId User's Unique Id
 * @apiParam {String} name Issue Title
 * @apiParam {String} [description] Issue Description
 * @apiParam {string="backlog","progress","test","done"} status Issue Status
 * @apiParam {String} reporter Issue's Reporter
 * @apiParam {string="Meduim","High","Low"} priority Issue's Priority
 * @apiParam {String} [estimates] Issue's estimate completion time
 * @apiParam {String} assignee  Assignee Id
 * @apiParam {String} [watchList]  Watchlist user Id's
 * @apiHeader {String} authToken AuthorizationToken Recieved after Login Success
 * @apiSuccessExample {json} Issue Creation Success Response
 * {
      "error": false,
      "status": 200,
      "message": "Issue Created",
      "data": {
        "description": "z issue",
        "createDate": "2020-11-05T07:20:47.067Z",
        "watchList": [],
        "comments": [],
        "attachment": [],
        "_id": "5fa3a7f9c4626e453daad65f",
        "issueId": "L9YXlD5Ay",
        "userId": "_ofyQhK9u",
        "title": "xifth Issue",
        "status": "backlog",
        "reporter": "saurabh bharti",
        "priority": "high",
        "estimates": "1 w",
        "assignee": "_ofyQhK9u",
        "__v": 0
      }
    }
 *  
 *  @apiError   Error1 Required parameters are missing in the request query
 *  @apiError   Error2 authToken is missing in request
 *  @apiError   Error3 Invalid Token 
 *  @apiErrorExample Error-Response 1:
 *  {
 *    "error": true,
       "status": 400,
       "message": "\"title\" ,\"status\" ,\"reporter\" ,\"priority\" ,\"assignee\"  are required",
       "data": [
            "\"title\" ",
            "\"status\" ",
            "\"reporter\" ",
            "\"priority\" ",
            "\"assignee\" "
        ]
 *  }
 *  
 *  @apiErrorExample Error-Response 2:
 *  {
 *      "error": true,
        "status": 400,
        "message": "AuthToken Missing",
        "data": null
 *  }
 *  @apiErrorExample Error-Response 3:
    {
        "error": true,
        "status": 500,
        "message": "Error",
        "data": {
            "name": "JsonWebTokenError",
            "message": "invalid token"
        }
    }
*/
router.get("issue/allIssues", isAuthorized, taskListValidation, createTaskList);
/**
 * @api {get} /api/v1/issue/allIssues?userId=[userId] Get All Assigneed Issues of a userId
 * @apiVersion 0.0.1
 * @apiGroup IssueManagement
 * @apiParam {String} userId User's Unique Id
 * @apiHeader {String} authToken AuthorizationToken Recieved after Login Success
 * @apiSuccessExample {json} Issue Creation Success Response
 * {
    "error": false,
    "status": 200,
    "message": "Issues Fetched",
    "data": [
        {
            "_id": "5f9aa4e556dd1c607c94a4d2",
            "description": "<p>sdgfsdjhg</p>\n",
            "createDate": "2020-10-29T08:18:00.223Z",
            "watchList": [
                {
                    "_id": "5f942e5e39cf486a9fa0018b",
                    "userId": "EjLQ8s0Eg",
                    "name": "Johnny English"
                },
                {
                    "_id": "5f942e5e39cf486a9fa0018b",
                    "userId": "EjLQ8s0Eg",
                    "name": "Johnny English"
                },
                {
                    "_id": "5f93cb3e1d269674d14d5533",
                    "userId": "_ofyQhK9u",
                    "name": "Saurabh Bharti"
                },
                {
                    "_id": "5f93cb3e1d269674d14d5533",
                    "userId": "_ofyQhK9u",
                    "name": "Saurabh Bharti"
                }
            ],
            "comments": [],
            "attachment": [],
            "issueId": "GaGnCJfht",
            "userId": "_ofyQhK9u",
            "title": "Asdgsfhg",
            "status": "Backlogs",
            "reporter": "Saurabh Bharti",
            "priority": "Medium",
            "estimates": "1 w",
            "assignee": "EjLQ8s0Eg",
            "__v": 0,
            "modifiedDate": "2020-11-04T09:04:00.462Z"
        }
    ]
 }
 *  @apiError   Error1 authToken is missing in request
 *  @apiError   Error2 Invalid Token 
 *  
 *  @apiErrorExample Error-Response 1:
 *  {
 *      "error": true,
        "status": 400,
        "message": "AuthToken Missing",
        "data": null
 *  }
 *  @apiErrorExample Error-Response 2:
    {
        "error": true,
        "status": 500,
        "message": "Error",
        "data": {
            "name": "JsonWebTokenError",
            "message": "invalid token"
        }
    }
 **/
router.get(
  "/issue/filter",
  isAuthorized,
  validations.filterIssuesValidation,
  issues.filterIssues
);

/**
 * @api {get} /api/v1/issue/filter?userId=[userId]&name=[name]&option=[option]&type=[type] Filter Issues
 * @apiVersion 0.0.1
 * @apiGroup IssueManagement
 * @apiParam {String} userId User's Unique Id
 * @apiParam {String} name User's name
 * @apiParam {string="all","reportedByMe","openIssues","closedIssues","updatedRecent","resolvedRecent"} option Filter Options
 * @apiParam {string="status","time"} type Filter Type
 * @apiHeader {String} authToken AuthorizationToken Recieved after Login Success
 * @apiSuccessExample {json} Filtered Issue Success Response
 * {
        "error": false,
        "status": 200,
        "message": "Filtered Issues Fectched",
        "data": [
            {
                "description": "this is a test issue",
                "createDate": "2020-10-27T06:12:57.164Z",
                "watchList": [],
                "comments": [],
                "attachment": [],
                "issueId": "wLC1-OAir",
                "userId": "EjLQ8s0Eg",
                "title": "aifth Issue",
                "status": "backlog",
                "reporter": "johny english",
                "priority": "high",
                "estimates": "1 w"
            },
        ]
   }
 *  @apiError   Error1 Required parameters are missing in the request query
 *  @apiError   Error2 authToken is missing in request
 *  @apiError   Error3 Invalid Token 
 *  @apiErrorExample Error-Response 1:
 *  {
 *    "error": true,
       "status": 400,
       "message": "\"name\" ,\"status\" ,\"option\"  are required",
       "data": [
            "\"name\" ",
            "\"status\" ",
            "\"option\" ",
        ]
 *  }
 *  
 *  @apiErrorExample Error-Response 2:
 *  {
 *      "error": true,
        "status": 400,
        "message": "AuthToken Missing",
        "data": null
 *  }
 *  @apiErrorExample Error-Response 3:
    {
        "error": true,
        "status": 500,
        "message": "Error",
        "data": {
            "name": "JsonWebTokenError",
            "message": "invalid token"
        }
    }
 */
router.post(
  "/issue/update",
  isAuthorized,
  validations.updateIssueValidations,
  issues.updateIssue
);
/**
 * @api {post} /api/v1/issue/update?userId=[userId] Update a Issue
 * @apiVersion 0.0.1
 * @apiGroup IssueManagement
 * @apiParam {String} userId LoggedIn User's Unique Id
 * @apiParam {String} issueI Issue's UniqueId
 * @apiParam {json} Request-Example:
                 [updates:{ "filed": "updated field Value" }]
 * @apiHeader {String} authToken AuthorizationToken Recieved after Login Success
 * @apiParamExample {json} Update Sample Request
 * {
    "userId": "_ofyQhK9u",
    "issueId": "GaGnCJfht",
    "updates": {
        "title": "updated issue title extended",
        "description": "i have updates desc",
        "reporter":"saurabh bharti"
    }
 }
 * @apiSuccessExample {json} Updated Issue Success Response
 {
    "error": false,
    "status": 200,
    "message": "Issue Updated",
    "data": "1 issue updated"
 }
 *  @apiError   Error1 Required parameters are missing in the request query
 *  @apiError   Error2 authToken is missing in request
 *  @apiError   Error3 Invalid Token 
 *  @apiError   Error3 Invalid UserId
 *  @apiError   Error4 Invalid IssueId
 *  @apiErrorExample Error-Response 1:
 *  {
 *    "error": true,
       "status": 400,
       "message": "\"userId\" ,\"issueId\" ,\"updates\"  are required",
       "data": [
            "\"userId\" ",
            "\"issueId\" ",
            "\"updates\" ",
        ]
 *  }
 *  
 *  @apiErrorExample Error-Response 2:
 *  {
 *      "error": true,
        "status": 400,
        "message": "AuthToken Missing",
        "data": null
 *  }
 *  @apiErrorExample Error-Response 3:
    {
        "error": true,
        "status": 500,
        "message": "Error",
        "data": {
            "name": "JsonWebTokenError",
            "message": "invalid token"
        }
    }
    @apiErrorExample Error-Response 4:
 *  {
 *      "error": true,
        "status": 400,
        "message": "Invalid  UserID",
        "data": null
 *  }
 *  @apiErrorExample Error-Response 5:
    {
        "error": true,
        "status": 500,
        "message": Invalid IssueId
        "data": null
    }
 *
 *
 */
router.post(
  "/issue/comment",
  isAuthorized,
  validations.addCommentValidations,
  issues.addComment
);
/**
 * @api {post} /api/v1/issue/comment?userId=[userId]&issueId=[issueId]&name=[name] Add a comment
 * @apiVersion 0.0.1
 * @apiGroup CommentManagement
 * @apiParam {String} userId LoggedIn User's Unique Id
 * @apiParam {String} issueId Issue's UniqueId
 * @apiParam {String} name commenting user's name
 * @apiParam {String} text Comment Text
 * @apiHeader {String} authToken AuthorizationToken Recieved after Login Success
 * @apiParamExample {json} Update Sample Request
 * {
       "text":"<p>updated attachment</p>"
   }
 * @apiSuccessExample {json} Comment Addition Success Response
 {
    "error": false,
    "status": 200,
    "message": "Comments Added",
    "data": {
        "createdAt": "2020-11-05T08:41:50.678Z",
        "_id": "5fa3bb2f83ebaf71a8b416c6",
        "commentId": "be3fu3iQv",
        "userId": "_ofyQhK9u",
        "text": "<p>updated attachment</p>",
        "issueId": "GaGnCJfht",
        "name": "Saurabh Bharti",
        "__v": 0
    }
}
 *  @apiError   Error1 Required parameters are missing in the request query
 *  @apiError   Error2 authToken is missing in request
 *  @apiError   Error3 Invalid Token 
 *  @apiError   Error3 Invalid UserId
 *  @apiError   Error4 Invalid IssueId
 *  @apiErrorExample Error-Response 1:
 *  {
 *    "error": true,
       "status": 400,
       "message": "\"userId\" ,\"issueId\" ,\"name\",\"text\"  are required",
       "data": [
            "\"userId\" ",
            "\"issueId\" ",
            "\"name\" ",
            "\"text\" ",
        ]
 *  }
 *  
 *  @apiErrorExample Error-Response 2:
 *  {
 *      "error": true,
        "status": 400,
        "message": "AuthToken Missing",
        "data": null
 *  }
 *  @apiErrorExample Error-Response 3:
    {
        "error": true,
        "status": 500,
        "message": "Error",
        "data": {
            "name": "JsonWebTokenError",
            "message": "invalid token"
        }
    }
    @apiErrorExample Error-Response 4:
 *  {
 *      "error": true,
        "status": 400,
        "message": "Invalid  UserID",
        "data": null
 *  }
 *  @apiErrorExample Error-Response 5:
    {
        "error": true,
        "status": 500,
        "message": Invalid IssueId
        "data": null
    }
 *
 */
router.post(
  "/issue/edit/comment",
  isAuthorized,
  validations.updateCommentValidation,
  issues.updateComment
);
/**
 * @api {post} /api/v1/issue/edit/comment?userId=[userId] Edit A comment
 * @apiVersion 0.0.1
 * @apiGroup CommentManagement
 * @apiParam {String} userId LoggedIn User's Unique Id
 * @apiParam {String} commentId Comment's UniqueId
 * @apiParam {String} text Comment Text
 * @apiHeader {String} authToken AuthorizationToken Recieved after Login Success
 * @apiParamExample {json} Update Comment Sample Request
 * {
     "commentId":"5KPV4q1H2",
     "text":"saurabh updated comment"
   }
 * @apiSuccessExample {json} Comment Update Success Response
 {
    "error": false,
    "status": 200,
    "message": "Comment updated",
    "data": "1 comment updated"
}
 *  @apiError   Error1 Required parameters are missing in the request query
 *  @apiError   Error2 authToken is missing in request
 *  @apiError   Error3 Invalid Token 
 *  @apiError   Error4 Invalid CommentId

 *  @apiErrorExample Error-Response 1:
 *  {
 *    "error": true,
       "status": 400,
       "message": "\"commentId\" ,\"text\"  are required",
       "data": [
            "\"commentId\" ",
            "\"text\" ",
        ]
 *  }
 *  
 *  @apiErrorExample Error-Response 2:
 *  {
 *      "error": true,
        "status": 400,
        "message": "AuthToken Missing",
        "data": null
 *  }
 *  @apiErrorExample Error-Response 3:
    {
        "error": true,
        "status": 500,
        "message": "Error",
        "data": {
            "name": "JsonWebTokenError",
            "message": "invalid token"
        }
    }
    @apiErrorExample Error-Response 4:
 *  {
 *      "error": true,
        "status": 400,
        "message": "Invalid  CommentId",
        "data": null
 *  }
 *
 */

router.post(
  "/issue/delete/comment",
  isAuthorized,
  validations.deleteCommentValidation,
  issues.deleteComment
);
/**
 * @api {delete} /api/v1/issue/delete/comment?commentId=[commentId]&userId=[userId] Delete a comment
 * @apiVersion 0.0.1
 * @apiGroup CommentManagement
 * @apiParam {String} userId LoggedIn User's Unique Id
 * @apiParam {String} commentId Comment's UniqueId
 * @apiHeader {String} authToken AuthorizationToken Recieved after Login Success
 * @apiSuccessExample {json} Comment Update Success Response
 {
    "error": false,
    "status": 200,
    "message": "Comment Deleted",
    "data": "1 comment deleted"
}
 *  @apiError   Error1 Required parameters are missing in the request query
 *  @apiError   Error2 authToken is missing in request
 *  @apiError   Error3 Invalid Token 
 *  @apiError   Error4 Invalid CommentId

 *  @apiErrorExample Error-Response 1:
 *  {
 *    "error": true,
       "status": 400,
       "message": "\"commentId\" ,\"userId\"  are required",
       "data": [
            "\"commentId\" ",
            "\"userId\" ",
        ]
 *  }
 *  
 *  @apiErrorExample Error-Response 2:
 *  {
 *      "error": true,
        "status": 400,
        "message": "AuthToken Missing",
        "data": null
 *  }
 *  @apiErrorExample Error-Response 3:
    {
        "error": true,
        "status": 500,
        "message": "Error",
        "data": {
            "name": "JsonWebTokenError",
            "message": "invalid token"
        }
    }
    @apiErrorExample Error-Response 4:
 *  {
 *      "error": true,
        "status": 400,
        "message": "Invalid  CommentId",
        "data": null
 *  }
 *
 */

router.get(
  "/issue/search",
  isAuthorized,
  validations.searchRouteValidation,
  issues.searchRoute
);

/**
 * @api {post} /api/v1/issue/search?userId=[userId]&search=[search] Search issues with keywords
 * @apiVersion 0.0.1
 * @apiGroup IssueManagement
 * @apiParam {String} userId LoggedIn User's Unique Id
 * @apiParam {String} search Search Keyword e.g title, description,reporter,name
 * @apiHeader {String} authToken AuthorizationToken Recieved after Login Success
 * @apiSuccessExample {json} Issue Search Success Response
 {
    "error": false,
    "status": 200,
    "message": "Issues Fetched",
    "data": [
        {
            "description": "<p>updated-2</p>\n",
            "createDate": "2020-10-29T06:25:09.079Z",
            "watchList": [
                {
                    "_id": "5f942e5e39cf486a9fa0018b",
                    "userId": "EjLQ8s0Eg",
                    "name": "Johnny English"
                },
                {
                    "_id": "5f942e5e39cf486a9fa0018b",
                    "userId": "EjLQ8s0Eg",
                    "name": "Johnny English"
                }
            ],
            "comments": [
                {
                    "_id": "5f9eef33f7c099468aef8e7a",
                    "createdAt": "2020-11-01T17:15:43.295Z",
                    "commentId": "5WlYwQzkk",
                    "userId": "_ofyQhK9u",
                    "text": "<p>asdas</p>\n",
                    "issueId": "kPQb9eYRR",
                    "name": "Saurabh Bharti",
                    "__v": 0
                }
            ],
            "attachment": [],
            "issueId": "kPQb9eYRR",
            "userId": "_ofyQhK9u",
            "title": "web-title-update",
            "status": "Progress",
            "reporter": "Saurabh Bharti",
            "priority": "Medium",
            "estimates": "1 w",
            "assignee": "_ofyQhK9u",
            "modifiedDate": "2020-11-04T07:11:28.288Z"
        }
    ]
}
 *  @apiError   Error2 authToken is missing in request
 *  @apiError   Error3 Invalid Token 
 *  
 *  @apiErrorExample Error-Response 1:
 *  {
 *      "error": true,
        "status": 400,
        "message": "AuthToken Missing",
        "data": null
 *  }
 *  @apiErrorExample Error-Response 2:
    {
        "error": true,
        "status": 500,
        "message": "Error",
        "data": {
            "name": "JsonWebTokenError",
            "message": "invalid token"
        }
    }
 *
 */
router.post(
  "/issue/upload",
  isAuthorized,
  uploadControl.uploadValidation,
  upload.single("file"),
  issues.uploadAttachment
);
/**
 * 
 * @api {post} /api/v1/issue/upload?userId=[userId]&issueId=[issueId] Upload an attachment
 * @apiVersion 0.0.1
 * @apiGroup AttachmentManagement
 * @apiParam {String} userId LoggedIn User's Unique Id
 * @apiParam {String} issueId Issue's UniqueId
 * @apiParam {String="jpeg","png"} file Attachment file ,max size 6MB
 * @apiHeader {String} authToken AuthorizationToken Recieved after Login Success
 * @apiParamExample {json} Update Sample Request
 * {
       "file":"Screenshot from 2020-09-12 13-46-17.png"
   }
 * @apiSuccessExample {json} Attachment Upload Success Response
 {
    "error": false,
    "status": 200,
    "message": "Attachment Uploaded",
    "data": {
        "fieldname": "file",
        "originalname": "Screenshot from 2020-09-12 13-46-17.png",
        "encoding": "7bit",
        "mimetype": "image/png",
        "id": "5fa3bde95e9ca67721c559e7",
        "filename": "b4a3a4852e184d1d21cdd19a9d7b0f64",
        "metadata": null,
        "bucketName": "attachments",
        "chunkSize": 261120,
        "size": 33308,
        "md5": "89ce7bd3d651b204b127b5468e1b211d",
        "uploadDate": "2020-11-05T08:55:05.867Z",
        "contentType": "image/png"
    }
}
 *  @apiError   Error2 authToken is missing in request
 *  @apiError   Error3 Invalid Token 
 *  @apiError   Error3 Invalid UserId
 *  @apiError   Error4 Invalid IssueId
 *  
 *  @apiErrorExample Error-Response 1:
 *  {
 *      "error": true,
        "status": 400,
        "message": "AuthToken Missing",
        "data": null
 *  }
 *  @apiErrorExample Error-Response 2:
    {
        "error": true,
        "status": 500,
        "message": "Error",
        "data": {
            "name": "JsonWebTokenError",
            "message": "invalid token"
        }
    }
    @apiErrorExample Error-Response 3:
 *  {
 *      "error": true,
        "status": 400,
        "message": "Invalid  UserID",
        "data": null
 *  }
 *  @apiErrorExample Error-Response 4:
    {
        "error": true,
        "status": 500,
        "message": Invalid IssueId
        "data": null
    }
 *
 */
router.get(
  "/issue/attachment",
  isAuthorized,
  validations.getImageValidation,
  uploadControl.fetchAttachment
);
/**
 * @api {get} /api/v1/issue/attachment?userId=[userId]&filename=[filename]&authToken=[authToken] Fetch an attchment Image
 * @apiVersion 0.0.1
 * @apiGroup AttachmentManagement
 * @apiParam {String} userId LoggedIn User's Unique Id
 * @apiParam {String} filename Attachment's filename
 * @apiParam {String} authToken AuthorizationToken Recieved after Login Success
 * @apiSuccessExample {json} Attachment Get Success Response
 {
    result:"Corresponding Image is Displayed"   
 }
 *  @apiError   Error1  authToken is missing in request
 *  @apiError   Error2  Invalid Token 
 *  
 *  @apiErrorExample Error-Response 1:
 *  {
 *      "error": true,
        "status": 400,
        "message": "AuthToken Missing",
        "data": null
 *  }
 *  @apiErrorExample Error-Response 2:
    {
        "error": true,
        "status": 500,
        "message": "Error",
        "data": {
            "name": "JsonWebTokenError",
            "message": "invalid token"
        }
    }
 * 
 */
router.delete(
  "/issue/delete/attachment",
  isAuthorized,
  validations.deleteImgValidation,
  uploadControl.deleteAttachment
);
/**
 * @api {delete} /api/v1/issue/delete/attachment?userId=[userId]&filename=[filename] Delete an attachment
 * @apiVersion 0.0.1
 * @apiGroup AttachmentManagement
 * @apiParam {String} userId LoggedIn User's Unique Id
 * @apiParam {String} filename Attachment's filename
 * @apiHeader {String} authToken AuthorizationToken Recieved after Login Success
 * @apiSuccessExample {json} Attachment Delete Success Response
 {
        "error": false,
        "status": 200,
        "message": "Attachment Deleted",
        "data": null
    
 }
 *  @apiError   Error1  authToken is missing in request
 *  @apiError   Error2  Invalid Token 
 *  
 *  @apiErrorExample Error-Response 1:
 *  {
 *      "error": true,
        "status": 400,
        "message": "AuthToken Missing",
        "data": null
 *  }
 *  @apiErrorExample Error-Response 2:
    {
        "error": true,
        "status": 500,
        "message": "Error",
        "data": {
            "name": "JsonWebTokenError",
            "message": "invalid token"
        }
    }
 * 
 */
