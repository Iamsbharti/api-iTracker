define({ "api": [
  {
    "type": "delete",
    "url": "/api/v1/issue/delete/attachment?userId=[userId]&filename=[filename]",
    "title": "Delete an attachment",
    "version": "0.0.1",
    "group": "AttachmentManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>LoggedIn User's Unique Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "filename",
            "description": "<p>Attachment's filename</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>AuthorizationToken Recieved after Login Success</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Attachment Delete Success Response",
          "content": "{\n       \"error\": false,\n       \"status\": 200,\n       \"message\": \"Attachment Deleted\",\n       \"data\": null\n   \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error1",
            "description": "<p>authToken is missing in request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error2",
            "description": "<p>Invalid Token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 1:",
          "content": "{\n    \"error\": true,\n       \"status\": 400,\n       \"message\": \"AuthToken Missing\",\n       \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 2:",
          "content": "{\n    \"error\": true,\n    \"status\": 500,\n    \"message\": \"Error\",\n    \"data\": {\n        \"name\": \"JsonWebTokenError\",\n        \"message\": \"invalid token\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/apidoc.js",
    "groupTitle": "AttachmentManagement",
    "name": "DeleteApiV1IssueDeleteAttachmentUseridUseridFilenameFilename"
  },
  {
    "type": "get",
    "url": "/api/v1/issue/attachment?userId=[userId]&filename=[filename]&authToken=[authToken]",
    "title": "Fetch an attchment Image",
    "version": "0.0.1",
    "group": "AttachmentManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>LoggedIn User's Unique Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "filename",
            "description": "<p>Attachment's filename</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>AuthorizationToken Recieved after Login Success</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Attachment Get Success Response",
          "content": "{\n   result:\"Corresponding Image is Displayed\"   \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error1",
            "description": "<p>authToken is missing in request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error2",
            "description": "<p>Invalid Token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 1:",
          "content": "{\n    \"error\": true,\n       \"status\": 400,\n       \"message\": \"AuthToken Missing\",\n       \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 2:",
          "content": "{\n    \"error\": true,\n    \"status\": 500,\n    \"message\": \"Error\",\n    \"data\": {\n        \"name\": \"JsonWebTokenError\",\n        \"message\": \"invalid token\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/apidoc.js",
    "groupTitle": "AttachmentManagement",
    "name": "GetApiV1IssueAttachmentUseridUseridFilenameFilenameAuthtokenAuthtoken"
  },
  {
    "type": "post",
    "url": "/api/v1/issue/upload?userId=[userId]&issueId=[issueId]",
    "title": "Upload an attachment",
    "version": "0.0.1",
    "group": "AttachmentManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>LoggedIn User's Unique Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>Issue's UniqueId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"jpeg\"",
              "\"png\""
            ],
            "optional": false,
            "field": "file",
            "description": "<p>Attachment file ,max size 6MB</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Update Sample Request",
          "content": "{\n       \"file\":\"Screenshot from 2020-09-12 13-46-17.png\"\n   }",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>AuthorizationToken Recieved after Login Success</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Attachment Upload Success Response",
          "content": " {\n    \"error\": false,\n    \"status\": 200,\n    \"message\": \"Attachment Uploaded\",\n    \"data\": {\n        \"fieldname\": \"file\",\n        \"originalname\": \"Screenshot from 2020-09-12 13-46-17.png\",\n        \"encoding\": \"7bit\",\n        \"mimetype\": \"image/png\",\n        \"id\": \"5fa3bde95e9ca67721c559e7\",\n        \"filename\": \"b4a3a4852e184d1d21cdd19a9d7b0f64\",\n        \"metadata\": null,\n        \"bucketName\": \"attachments\",\n        \"chunkSize\": 261120,\n        \"size\": 33308,\n        \"md5\": \"89ce7bd3d651b204b127b5468e1b211d\",\n        \"uploadDate\": \"2020-11-05T08:55:05.867Z\",\n        \"contentType\": \"image/png\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error2",
            "description": "<p>authToken is missing in request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error3",
            "description": "<p>Invalid Token</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error4",
            "description": "<p>Invalid IssueId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 1:",
          "content": "{\n    \"error\": true,\n       \"status\": 400,\n       \"message\": \"AuthToken Missing\",\n       \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 2:",
          "content": "{\n    \"error\": true,\n    \"status\": 500,\n    \"message\": \"Error\",\n    \"data\": {\n        \"name\": \"JsonWebTokenError\",\n        \"message\": \"invalid token\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 3:",
          "content": "{\n    \"error\": true,\n       \"status\": 400,\n       \"message\": \"Invalid  UserID\",\n       \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 4:",
          "content": "{\n    \"error\": true,\n    \"status\": 500,\n    \"message\": Invalid IssueId\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/apidoc.js",
    "groupTitle": "AttachmentManagement",
    "name": "PostApiV1IssueUploadUseridUseridIssueidIssueid"
  },
  {
    "type": "delete",
    "url": "/api/v1/issue/delete/comment?commentId=[commentId]&userId=[userId]",
    "title": "Delete a comment",
    "version": "0.0.1",
    "group": "CommentManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>LoggedIn User's Unique Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "commentId",
            "description": "<p>Comment's UniqueId</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>AuthorizationToken Recieved after Login Success</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Comment Update Success Response",
          "content": " {\n    \"error\": false,\n    \"status\": 200,\n    \"message\": \"Comment Deleted\",\n    \"data\": \"1 comment deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error1",
            "description": "<p>Required parameters are missing in the request query</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error2",
            "description": "<p>authToken is missing in request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error3",
            "description": "<p>Invalid Token</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error4",
            "description": "<p>Invalid CommentId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 1:",
          "content": "{\n  \"error\": true,\n      \"status\": 400,\n      \"message\": \"\\\"commentId\\\" ,\\\"userId\\\"  are required\",\n      \"data\": [\n           \"\\\"commentId\\\" \",\n           \"\\\"userId\\\" \",\n       ]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 2:",
          "content": "{\n    \"error\": true,\n       \"status\": 400,\n       \"message\": \"AuthToken Missing\",\n       \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 3:",
          "content": "{\n    \"error\": true,\n    \"status\": 500,\n    \"message\": \"Error\",\n    \"data\": {\n        \"name\": \"JsonWebTokenError\",\n        \"message\": \"invalid token\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 4:",
          "content": "{\n    \"error\": true,\n       \"status\": 400,\n       \"message\": \"Invalid  CommentId\",\n       \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/apidoc.js",
    "groupTitle": "CommentManagement",
    "name": "DeleteApiV1IssueDeleteCommentCommentidCommentidUseridUserid"
  },
  {
    "type": "post",
    "url": "/api/v1/issue/comment?userId=[userId]&issueId=[issueId]&name=[name]",
    "title": "Add a comment",
    "version": "0.0.1",
    "group": "CommentManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>LoggedIn User's Unique Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>Issue's UniqueId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>commenting user's name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Comment Text</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Update Sample Request",
          "content": "{\n       \"text\":\"<p>updated attachment</p>\"\n   }",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>AuthorizationToken Recieved after Login Success</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Comment Addition Success Response",
          "content": " {\n    \"error\": false,\n    \"status\": 200,\n    \"message\": \"Comments Added\",\n    \"data\": {\n        \"createdAt\": \"2020-11-05T08:41:50.678Z\",\n        \"_id\": \"5fa3bb2f83ebaf71a8b416c6\",\n        \"commentId\": \"be3fu3iQv\",\n        \"userId\": \"_ofyQhK9u\",\n        \"text\": \"<p>updated attachment</p>\",\n        \"issueId\": \"GaGnCJfht\",\n        \"name\": \"Saurabh Bharti\",\n        \"__v\": 0\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error1",
            "description": "<p>Required parameters are missing in the request query</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error2",
            "description": "<p>authToken is missing in request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error3",
            "description": "<p>Invalid Token</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error4",
            "description": "<p>Invalid IssueId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 1:",
          "content": "{\n  \"error\": true,\n      \"status\": 400,\n      \"message\": \"\\\"userId\\\" ,\\\"issueId\\\" ,\\\"name\\\",\\\"text\\\"  are required\",\n      \"data\": [\n           \"\\\"userId\\\" \",\n           \"\\\"issueId\\\" \",\n           \"\\\"name\\\" \",\n           \"\\\"text\\\" \",\n       ]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 2:",
          "content": "{\n    \"error\": true,\n       \"status\": 400,\n       \"message\": \"AuthToken Missing\",\n       \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 3:",
          "content": "{\n    \"error\": true,\n    \"status\": 500,\n    \"message\": \"Error\",\n    \"data\": {\n        \"name\": \"JsonWebTokenError\",\n        \"message\": \"invalid token\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 4:",
          "content": "{\n    \"error\": true,\n       \"status\": 400,\n       \"message\": \"Invalid  UserID\",\n       \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 5:",
          "content": "{\n    \"error\": true,\n    \"status\": 500,\n    \"message\": Invalid IssueId\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/apidoc.js",
    "groupTitle": "CommentManagement",
    "name": "PostApiV1IssueCommentUseridUseridIssueidIssueidNameName"
  },
  {
    "type": "post",
    "url": "/api/v1/issue/edit/comment?userId=[userId]",
    "title": "Edit A comment",
    "version": "0.0.1",
    "group": "CommentManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>LoggedIn User's Unique Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "commentId",
            "description": "<p>Comment's UniqueId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Comment Text</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Update Comment Sample Request",
          "content": "{\n     \"commentId\":\"5KPV4q1H2\",\n     \"text\":\"saurabh updated comment\"\n   }",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>AuthorizationToken Recieved after Login Success</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Comment Update Success Response",
          "content": " {\n    \"error\": false,\n    \"status\": 200,\n    \"message\": \"Comment updated\",\n    \"data\": \"1 comment updated\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error1",
            "description": "<p>Required parameters are missing in the request query</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error2",
            "description": "<p>authToken is missing in request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error3",
            "description": "<p>Invalid Token</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error4",
            "description": "<p>Invalid CommentId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 1:",
          "content": "{\n  \"error\": true,\n      \"status\": 400,\n      \"message\": \"\\\"commentId\\\" ,\\\"text\\\"  are required\",\n      \"data\": [\n           \"\\\"commentId\\\" \",\n           \"\\\"text\\\" \",\n       ]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 2:",
          "content": "{\n    \"error\": true,\n       \"status\": 400,\n       \"message\": \"AuthToken Missing\",\n       \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 3:",
          "content": "{\n    \"error\": true,\n    \"status\": 500,\n    \"message\": \"Error\",\n    \"data\": {\n        \"name\": \"JsonWebTokenError\",\n        \"message\": \"invalid token\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 4:",
          "content": "{\n    \"error\": true,\n       \"status\": 400,\n       \"message\": \"Invalid  CommentId\",\n       \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/apidoc.js",
    "groupTitle": "CommentManagement",
    "name": "PostApiV1IssueEditCommentUseridUserid"
  },
  {
    "type": "get",
    "url": "/api/v1/issue/allIssues?userId=[userId]",
    "title": "Get All Assigneed Issues of a userId",
    "version": "0.0.1",
    "group": "IssueManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>User's Unique Id</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>AuthorizationToken Recieved after Login Success</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Issue Creation Success Response",
          "content": "{\n    \"error\": false,\n    \"status\": 200,\n    \"message\": \"Issues Fetched\",\n    \"data\": [\n        {\n            \"_id\": \"5f9aa4e556dd1c607c94a4d2\",\n            \"description\": \"<p>sdgfsdjhg</p>\\n\",\n            \"createDate\": \"2020-10-29T08:18:00.223Z\",\n            \"watchList\": [\n                {\n                    \"_id\": \"5f942e5e39cf486a9fa0018b\",\n                    \"userId\": \"EjLQ8s0Eg\",\n                    \"name\": \"Johnny English\"\n                },\n                {\n                    \"_id\": \"5f942e5e39cf486a9fa0018b\",\n                    \"userId\": \"EjLQ8s0Eg\",\n                    \"name\": \"Johnny English\"\n                },\n                {\n                    \"_id\": \"5f93cb3e1d269674d14d5533\",\n                    \"userId\": \"_ofyQhK9u\",\n                    \"name\": \"Saurabh Bharti\"\n                },\n                {\n                    \"_id\": \"5f93cb3e1d269674d14d5533\",\n                    \"userId\": \"_ofyQhK9u\",\n                    \"name\": \"Saurabh Bharti\"\n                }\n            ],\n            \"comments\": [],\n            \"attachment\": [],\n            \"issueId\": \"GaGnCJfht\",\n            \"userId\": \"_ofyQhK9u\",\n            \"title\": \"Asdgsfhg\",\n            \"status\": \"Backlogs\",\n            \"reporter\": \"Saurabh Bharti\",\n            \"priority\": \"Medium\",\n            \"estimates\": \"1 w\",\n            \"assignee\": \"EjLQ8s0Eg\",\n            \"__v\": 0,\n            \"modifiedDate\": \"2020-11-04T09:04:00.462Z\"\n        }\n    ]\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error1",
            "description": "<p>authToken is missing in request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error2",
            "description": "<p>Invalid Token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 1:",
          "content": "{\n    \"error\": true,\n       \"status\": 400,\n       \"message\": \"AuthToken Missing\",\n       \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 2:",
          "content": "{\n    \"error\": true,\n    \"status\": 500,\n    \"message\": \"Error\",\n    \"data\": {\n        \"name\": \"JsonWebTokenError\",\n        \"message\": \"invalid token\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/apidoc.js",
    "groupTitle": "IssueManagement",
    "name": "GetApiV1IssueAllissuesUseridUserid"
  },
  {
    "type": "get",
    "url": "/api/v1/issue/filter?userId=[userId]&name=[name]&option=[option]&type=[type]",
    "title": "Filter Issues",
    "version": "0.0.1",
    "group": "IssueManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>User's Unique Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User's name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"all\"",
              "\"reportedByMe\"",
              "\"openIssues\"",
              "\"closedIssues\"",
              "\"updatedRecent\"",
              "\"resolvedRecent\""
            ],
            "optional": false,
            "field": "option",
            "description": "<p>Filter Options</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"status\"",
              "\"time\""
            ],
            "optional": false,
            "field": "type",
            "description": "<p>Filter Type</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>AuthorizationToken Recieved after Login Success</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Filtered Issue Success Response",
          "content": "{\n        \"error\": false,\n        \"status\": 200,\n        \"message\": \"Filtered Issues Fectched\",\n        \"data\": [\n            {\n                \"description\": \"this is a test issue\",\n                \"createDate\": \"2020-10-27T06:12:57.164Z\",\n                \"watchList\": [],\n                \"comments\": [],\n                \"attachment\": [],\n                \"issueId\": \"wLC1-OAir\",\n                \"userId\": \"EjLQ8s0Eg\",\n                \"title\": \"aifth Issue\",\n                \"status\": \"backlog\",\n                \"reporter\": \"johny english\",\n                \"priority\": \"high\",\n                \"estimates\": \"1 w\"\n            },\n        ]\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error1",
            "description": "<p>Required parameters are missing in the request query</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error2",
            "description": "<p>authToken is missing in request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error3",
            "description": "<p>Invalid Token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 1:",
          "content": "{\n  \"error\": true,\n      \"status\": 400,\n      \"message\": \"\\\"name\\\" ,\\\"status\\\" ,\\\"option\\\"  are required\",\n      \"data\": [\n           \"\\\"name\\\" \",\n           \"\\\"status\\\" \",\n           \"\\\"option\\\" \",\n       ]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 2:",
          "content": "{\n    \"error\": true,\n       \"status\": 400,\n       \"message\": \"AuthToken Missing\",\n       \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 3:",
          "content": "{\n    \"error\": true,\n    \"status\": 500,\n    \"message\": \"Error\",\n    \"data\": {\n        \"name\": \"JsonWebTokenError\",\n        \"message\": \"invalid token\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/apidoc.js",
    "groupTitle": "IssueManagement",
    "name": "GetApiV1IssueFilterUseridUseridNameNameOptionOptionTypeType"
  },
  {
    "type": "post",
    "url": "/api/v1/issue/create?userId=[userId]&title=[title]&description=[description]&status=[status]&reporter=[reporter]&priority=[priority]&estimates=[estimate]&assignee=[assignee]&watchList=[watchList]",
    "title": "Create a Issue",
    "version": "0.0.1",
    "group": "IssueManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>User's Unique Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Issue Title</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Issue Description</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"backlog\"",
              "\"progress\"",
              "\"test\"",
              "\"done\""
            ],
            "optional": false,
            "field": "status",
            "description": "<p>Issue Status</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "reporter",
            "description": "<p>Issue's Reporter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"Meduim\"",
              "\"High\"",
              "\"Low\""
            ],
            "optional": false,
            "field": "priority",
            "description": "<p>Issue's Priority</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "estimates",
            "description": "<p>Issue's estimate completion time</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "assignee",
            "description": "<p>Assignee Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "watchList",
            "description": "<p>Watchlist user Id's</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>AuthorizationToken Recieved after Login Success</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Issue Creation Success Response",
          "content": "{\n      \"error\": false,\n      \"status\": 200,\n      \"message\": \"Issue Created\",\n      \"data\": {\n        \"description\": \"z issue\",\n        \"createDate\": \"2020-11-05T07:20:47.067Z\",\n        \"watchList\": [],\n        \"comments\": [],\n        \"attachment\": [],\n        \"_id\": \"5fa3a7f9c4626e453daad65f\",\n        \"issueId\": \"L9YXlD5Ay\",\n        \"userId\": \"_ofyQhK9u\",\n        \"title\": \"xifth Issue\",\n        \"status\": \"backlog\",\n        \"reporter\": \"saurabh bharti\",\n        \"priority\": \"high\",\n        \"estimates\": \"1 w\",\n        \"assignee\": \"_ofyQhK9u\",\n        \"__v\": 0\n      }\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error1",
            "description": "<p>Required parameters are missing in the request query</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error2",
            "description": "<p>authToken is missing in request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error3",
            "description": "<p>Invalid Token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 1:",
          "content": "{\n  \"error\": true,\n      \"status\": 400,\n      \"message\": \"\\\"title\\\" ,\\\"status\\\" ,\\\"reporter\\\" ,\\\"priority\\\" ,\\\"assignee\\\"  are required\",\n      \"data\": [\n           \"\\\"title\\\" \",\n           \"\\\"status\\\" \",\n           \"\\\"reporter\\\" \",\n           \"\\\"priority\\\" \",\n           \"\\\"assignee\\\" \"\n       ]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 2:",
          "content": "{\n    \"error\": true,\n       \"status\": 400,\n       \"message\": \"AuthToken Missing\",\n       \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 3:",
          "content": "{\n    \"error\": true,\n    \"status\": 500,\n    \"message\": \"Error\",\n    \"data\": {\n        \"name\": \"JsonWebTokenError\",\n        \"message\": \"invalid token\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/apidoc.js",
    "groupTitle": "IssueManagement",
    "name": "PostApiV1IssueCreateUseridUseridTitleTitleDescriptionDescriptionStatusStatusReporterReporterPriorityPriorityEstimatesEstimateAssigneeAssigneeWatchlistWatchlist"
  },
  {
    "type": "post",
    "url": "/api/v1/issue/search?userId=[userId]&search=[search]",
    "title": "Search issues with keywords",
    "version": "0.0.1",
    "group": "IssueManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>LoggedIn User's Unique Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "search",
            "description": "<p>Search Keyword e.g title, description,reporter,name</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>AuthorizationToken Recieved after Login Success</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Issue Search Success Response",
          "content": " {\n    \"error\": false,\n    \"status\": 200,\n    \"message\": \"Issues Fetched\",\n    \"data\": [\n        {\n            \"description\": \"<p>updated-2</p>\\n\",\n            \"createDate\": \"2020-10-29T06:25:09.079Z\",\n            \"watchList\": [\n                {\n                    \"_id\": \"5f942e5e39cf486a9fa0018b\",\n                    \"userId\": \"EjLQ8s0Eg\",\n                    \"name\": \"Johnny English\"\n                },\n                {\n                    \"_id\": \"5f942e5e39cf486a9fa0018b\",\n                    \"userId\": \"EjLQ8s0Eg\",\n                    \"name\": \"Johnny English\"\n                }\n            ],\n            \"comments\": [\n                {\n                    \"_id\": \"5f9eef33f7c099468aef8e7a\",\n                    \"createdAt\": \"2020-11-01T17:15:43.295Z\",\n                    \"commentId\": \"5WlYwQzkk\",\n                    \"userId\": \"_ofyQhK9u\",\n                    \"text\": \"<p>asdas</p>\\n\",\n                    \"issueId\": \"kPQb9eYRR\",\n                    \"name\": \"Saurabh Bharti\",\n                    \"__v\": 0\n                }\n            ],\n            \"attachment\": [],\n            \"issueId\": \"kPQb9eYRR\",\n            \"userId\": \"_ofyQhK9u\",\n            \"title\": \"web-title-update\",\n            \"status\": \"Progress\",\n            \"reporter\": \"Saurabh Bharti\",\n            \"priority\": \"Medium\",\n            \"estimates\": \"1 w\",\n            \"assignee\": \"_ofyQhK9u\",\n            \"modifiedDate\": \"2020-11-04T07:11:28.288Z\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error2",
            "description": "<p>authToken is missing in request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error3",
            "description": "<p>Invalid Token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 1:",
          "content": "{\n    \"error\": true,\n       \"status\": 400,\n       \"message\": \"AuthToken Missing\",\n       \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 2:",
          "content": "{\n    \"error\": true,\n    \"status\": 500,\n    \"message\": \"Error\",\n    \"data\": {\n        \"name\": \"JsonWebTokenError\",\n        \"message\": \"invalid token\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/apidoc.js",
    "groupTitle": "IssueManagement",
    "name": "PostApiV1IssueSearchUseridUseridSearchSearch"
  },
  {
    "type": "post",
    "url": "/api/v1/issue/update?userId=[userId]",
    "title": "Update a Issue",
    "version": "0.0.1",
    "group": "IssueManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>LoggedIn User's Unique Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueI",
            "description": "<p>Issue's UniqueId</p>"
          },
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "Request-Example:",
            "description": "<p>[updates:{ &quot;filed&quot;: &quot;updated field Value&quot; }]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Update Sample Request",
          "content": "{\n    \"userId\": \"_ofyQhK9u\",\n    \"issueId\": \"GaGnCJfht\",\n    \"updates\": {\n        \"title\": \"updated issue title extended\",\n        \"description\": \"i have updates desc\",\n        \"reporter\":\"saurabh bharti\"\n    }\n }",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>AuthorizationToken Recieved after Login Success</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Updated Issue Success Response",
          "content": "{\n   \"error\": false,\n   \"status\": 200,\n   \"message\": \"Issue Updated\",\n   \"data\": \"1 issue updated\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error1",
            "description": "<p>Required parameters are missing in the request query</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error2",
            "description": "<p>authToken is missing in request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error3",
            "description": "<p>Invalid Token</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error4",
            "description": "<p>Invalid IssueId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 1:",
          "content": "{\n  \"error\": true,\n      \"status\": 400,\n      \"message\": \"\\\"userId\\\" ,\\\"issueId\\\" ,\\\"updates\\\"  are required\",\n      \"data\": [\n           \"\\\"userId\\\" \",\n           \"\\\"issueId\\\" \",\n           \"\\\"updates\\\" \",\n       ]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 2:",
          "content": "{\n    \"error\": true,\n       \"status\": 400,\n       \"message\": \"AuthToken Missing\",\n       \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 3:",
          "content": "{\n    \"error\": true,\n    \"status\": 500,\n    \"message\": \"Error\",\n    \"data\": {\n        \"name\": \"JsonWebTokenError\",\n        \"message\": \"invalid token\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 4:",
          "content": "{\n    \"error\": true,\n       \"status\": 400,\n       \"message\": \"Invalid  UserID\",\n       \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 5:",
          "content": "{\n    \"error\": true,\n    \"status\": 500,\n    \"message\": Invalid IssueId\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/apidoc.js",
    "groupTitle": "IssueManagement",
    "name": "PostApiV1IssueUpdateUseridUserid"
  },
  {
    "type": "post",
    "url": "/api/v1/recoverPassword",
    "title": "RecoverPassword Via Email",
    "version": "0.0.1",
    "group": "UserManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of User</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "RecoverPassword Sample Request",
          "content": "{\n      \"email\":\"user@gmail.com\",\n   }",
          "type": "json"
        },
        {
          "title": "RecoverPassword Invalid User Request",
          "content": "{\n      \"email\":\"us@gmail.com\"   \n   }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "RecoverPassword Success Response",
          "content": "{\n       \"error\": false,\n       \"status\": 200,\n       \"message\": \"Recovery Sucess\",\n       \"data\": {\n           \"email\": \"user@gmail.com\",\n           \"recoveryCode\": 759774,\n           \"Operation\": \"Email Sent\"\n        }\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "RecoverPassword Invalid User Response",
          "content": "{\n  \"error\": true,\n  \"status\": \"404\",\n  \"message\": \"User Not Found\",\n  \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/apidoc.js",
    "groupTitle": "UserManagement",
    "name": "PostApiV1Recoverpassword"
  },
  {
    "type": "post",
    "url": "/api/v1/resetPassword",
    "title": "ResetPassword for a User",
    "version": "0.0.1",
    "group": "UserManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "recoveryCode",
            "description": "<p>RecoveryCode sent in email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>NewPassword SetBy the User</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "ResetPassword Sample Request",
          "content": "{\n       \"recoveryCode\":\"759774\",\n       \"email\":\"user@gmail.com\",\n       \"password\":\"bharti123\"\n    }",
          "type": "json"
        },
        {
          "title": "ResetPassword Invalid User Request",
          "content": "{\n     \"recoveryCode\":\"759774\",\n     \"email\":\"us@gmail.com\",\n     \"password\":\"bharti123\"\n   }",
          "type": "json"
        },
        {
          "title": "ResetPassword Invalid Params Request",
          "content": "{\n     \"recoveryCode\":\"759774\",\n     \"email\":\"user@gmail.com\",\n   }",
          "type": "json"
        },
        {
          "title": "ResetPassword Invalid RecoveryCode Request",
          "content": "{\n     \"recoveryCode\":\"546346\",\n     \"email\":\"user@gmail.com\",\n     \"password\":\"bharti123\"\n   }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "ResetPassword Success Response",
          "content": "{\n      \"error\": false,\n      \"status\": 200,\n      \"message\": \"Password Reset Success\",\n      \"data\": {\n        \"updated\": 1,\n        \"email\": \"user@gmail.com\"\n      }\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "ResetPassword Invalid User Response",
          "content": "{\n  \"error\": true,\n  \"status\": \"404\",\n  \"message\": \"User Not Found\",\n  \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "ResetPassword Invalid Params Response",
          "content": "{\n  \"error\": true,\n  \"status\": 400,\n  \"message\": \"Not valid Input Params\",\n  \"data\": [\n     \"\\\"password\\\" is required\"\n  ]\n}",
          "type": "json"
        },
        {
          "title": "ResetPassword Invalid RecoveryCode Response",
          "content": "{\n  \"error\": true,\n  \"status\": 400,\n  \"message\": \"Not Valid RecoveryCode\",\n  \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/apidoc.js",
    "groupTitle": "UserManagement",
    "name": "PostApiV1Resetpassword"
  },
  {
    "type": "post",
    "url": "/api/v1/user/login",
    "title": "Login a user",
    "version": "0.0.1",
    "group": "UserManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "loginId",
            "description": "<p>Email/Username of User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password for login</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Login Sample Request",
          "content": "{\n      \"loginId\":\"sb@api.com\",\n      \"password\":\"saurabh123123\"\n    }",
          "type": "json"
        },
        {
          "title": "Login Invalid User Request",
          "content": "{\n      \"loginId\":\"us@gmail.com\",\n      \"password\":\"saurabh123123\"\n   }",
          "type": "json"
        },
        {
          "title": "Login Invalid Password Request",
          "content": "{\n      \"loginId\":\"user@gmail.com\",\n      \"password\":\"saurabh1231\"\n   }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Sign-Up Success Response",
          "content": "{\n       \"error\": false,\n       \"status\": 200,\n       \"message\": \"Login Sucess\",\n       \"data\": {\n          \"userId\": \"_ofyQhK9u\",\n          \"name\": \"Saurabh Bharti\",\n          \"email\": \"sb@api.com\",\n          \"username\": \"sbhbp\",\n          \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IlRyRXNUNFVEZiIsImlhdCI6MTU5NjcwOTQxODE1NSwiZXhwIjoxNTk2ODgyMjE4LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJrYW5iYW5Cb2FyZCIsImRhdGEiOnsiY3JlYXRlZE9uIjoiMjAyMC0wOC0wNlQxMDoxNTozMy41NjFaIiwiZnJpZW5kcyI6W10sInVzZXJJZCI6IlFXTHg4Y09jSiIsImZpcnN0TmFtZSI6Im5hbmN5IiwibGFzdE5hbWUiOiJzYW1zIiwiZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsIm1vYmlsZSI6IjIyMzQ2NjM3MjQyMSJ9fQ.Qktve9MPXunk4dn5ETDsZOpEFrG_dnwcpIdILWwaXPo\"\n        }\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Login Invalid User Response",
          "content": "{\n   \"error\": true,\n   \"status\": 404,\n   \"message\": \"User Not Found\",\n   \"data\": \"us@gmail.com\"\n}",
          "type": "json"
        },
        {
          "title": "Login Invalid Password Request",
          "content": "{\n      \"error\": true,\n      \"status\": 401,\n      \"message\": \"Authentication Failed\",\n      \"data\": null\n   }",
          "type": "json"
        }
      ]
    },
    "filename": "router/apidoc.js",
    "groupTitle": "UserManagement",
    "name": "PostApiV1UserLogin"
  },
  {
    "type": "post",
    "url": "/api/v1/user/register",
    "title": "Register a new user",
    "version": "0.0.1",
    "group": "UserManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>Name of User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>UserName of User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password needed for login</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sign-Up Sample Request",
          "content": "{\n        \"name\":\"George\",\n        \"email\":\"ge@api.com\",\n        \"username\":\"gory\",\n        \"password\":\"Sdgfhye@123\"\n    }",
          "type": "json"
        },
        {
          "title": "Sign-Up Invalid Params Request",
          "content": "{\n       \"name\":\"George\",\n       \"email\":\"ge@api.com\",\n       \"password\":\"Sjghgh@123\"\n   }",
          "type": "json"
        },
        {
          "title": "Sign-Up Invalid User Request",
          "content": "{\n     \"name\":\"George\",\n     \"email\":\"ge@api.com\",\n     \"username\":\"gory\",\n     \"password\":\"Aasdkjte123\"\n   }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Sign-Up Success Response",
          "content": "{\n        \"error\": false,\n        \"status\": 200,\n        \"message\": \"User Created Sucess\",\n        \"data\": {\n            \"userId\": \"te2T1TAGD\",\n            \"name\": \"George\",\n            \"email\": \"ge@api.com\",\n            \"username\": \"gory\",\n        }\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Sign-Up Invalid Params Response",
          "content": "{\n    \"error\": true,\n    \"status\": 400,\n    \"message\": \"Not valid Input Params\",\n    \"data\": [\n        \"\\\"username\\\" is required\"\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Sign-Up Invalid User Request",
          "content": "{\n      \"error\": true,\n      \"status\": 401,\n      \"message\": \"we already have you\",\n      \"data\": \"ge@api.com\"\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "router/apidoc.js",
    "groupTitle": "UserManagement",
    "name": "PostApiV1UserRegister"
  },
  {
    "type": "post",
    "url": "/api/v1/user/social/verify?email=[email]&name=[name]",
    "title": "Verifies a user from social login",
    "version": "0.0.1",
    "group": "UserManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email  of User from social media</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name from social account</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Login Invalid User Request",
          "content": "{\n      \"loginId\":\"us@gmail.com\",\n      \"password\":\"saurabh123123\"\n   }",
          "type": "json"
        },
        {
          "title": "Login Invalid Password Request",
          "content": "{\n      \"loginId\":\"user@gmail.com\",\n      \"password\":\"saurabh1231\"\n   }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Social verification Success Response",
          "content": "{\n    \"error\": false,\n    \"status\": 200,\n    \"message\": \"User Verification Success\",\n    \"data\": {\n        \"userId\": \"mzEvNEGR6\",\n        \"name\": \"Saurabh Bharti\",\n        \"email\": \"sbh@api.com\",\n        \"username\": \"sbh@api.com\",\n        \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6InBJNUZSRFZJUyIsImlhdCI6MTYwNDU2NzUyOTE4MywiZXhwIjoxNjA0NzQwMzI5LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJpVHJhY2tlciIsImRhdGEiOnsidXNlcklkIjoibXpFdk5FR1I2IiwibmFtZSI6IlNhdXJhYmggQmhhcnRpIiwiZW1haWwiOiJzYmhAYXBpLmNvbSIsInVzZXJuYW1lIjoic2JoQGFwaS5jb20ifX0.Ro3oB5YvuNRSU6WjtjGOxVG7T1nuvQg98vZYXvxALkM\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Login Invalid User Response",
          "content": "{\n   \"error\": true,\n   \"status\": 404,\n   \"message\": \"User Not Found\",\n   \"data\": \"us@gmail.com\"\n}",
          "type": "json"
        },
        {
          "title": "Login Invalid Password Request",
          "content": "{\n      \"error\": true,\n      \"status\": 401,\n      \"message\": \"Authentication Failed\",\n      \"data\": null\n   }",
          "type": "json"
        }
      ]
    },
    "filename": "router/apidoc.js",
    "groupTitle": "UserManagement",
    "name": "PostApiV1UserSocialVerifyEmailEmailNameName"
  }
] });
