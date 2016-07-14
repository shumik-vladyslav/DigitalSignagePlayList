define({ "api": [
  {
    "type": "post",
    "url": "/api/assets/upload",
    "title": "Upload Image",
    "version": "0.0.1",
    "name": "UploadImage",
    "group": "Asset",
    "description": "<p>Upload Image and create thumbnail.</p>",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "<form name      =  \"uploadForm\"\n      id        =  \"uploadForm\"\n      enctype   =  \"multipart/form-data\"\n      action    =  \"/api/assets/upload\"\n      method    =  \"POST\"\n>\n    <input type=\"file\" name=\"userImages\" />\n    <input type=\"submit\" value=\"Upload Image\" name=\"submit\">\n</form>",
          "type": "html"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "http://127.0.0.1:8888/api/assets/upload",
        "type": "js"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\ndata {\n     insertId: 5,\n     thumbPath: '/clientAssets/uploads/thumbnails/_1468011297776_face.png',\n     imagePath: '/clientAssets/uploads/userImages/_1468011297776_face.png'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"errno\": 1\n  \"code\": \"SQLITE_ERROR\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/assets/manager.ts",
    "groupTitle": "Asset",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:8888/api/assets/upload"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/messages/select/:id",
    "title": "Get Message",
    "version": "0.0.1",
    "name": "GetMessage",
    "group": "Messages",
    "description": "<p>Response message from DB by id.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": "<p>id in BD</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"id\":  1\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "http://127.0.0.1:8888/api/messages/select/1",
        "type": "js"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"id\": 1,\n        \"activ\": \"true\",\n        \"message\": \"some text\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"errno\": 1\n  \"code\": \"SQLITE_ERROR\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/message/manager.ts",
    "groupTitle": "Messages",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:8888/api/messages/select/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/messages/select/all",
    "title": "Get All Messages",
    "version": "0.0.1",
    "name": "GetMessages",
    "group": "Messages",
    "description": "<p>Response all messages from DB.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "http://127.0.0.1:8888/api/messages/select/all",
        "type": "js"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": [\n        {\n            \"id\": 1,\n            \"activ\": 1,\n            \"message\": \"some text\"\n        },\n        {\n            \"id\": 2,\n            \"activ\": 0,\n            \"message\": \"some text\"\n        }\n    ]\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"errno\": 1\n  \"code\": \"SQLITE_ERROR\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/message/manager.ts",
    "groupTitle": "Messages",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:8888/api/messages/select/all"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/messages/insert",
    "title": "Insert Message",
    "version": "0.0.1",
    "name": "InsertMessages",
    "group": "Messages",
    "description": "<p>Insert messages in DB.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "active",
            "description": "<p>true or false.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message text</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"active\":  \"true\",\n  \"message\": \"some text\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "http://127.0.0.1:8888/api/messages/insert",
        "type": "js"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"activ\": \"true\"\n  \"message\": \"some text\"\n  \"id\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"errno\": 1\n  \"code\": \"SQLITE_ERROR\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/message/manager.ts",
    "groupTitle": "Messages",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:8888/api/messages/insert"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/messages/update",
    "title": "Update Message",
    "version": "0.0.1",
    "name": "UpdateMessage",
    "group": "Messages",
    "description": "<p>Update messages in DB.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id in BD</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "active",
            "description": "<p>true or false.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message text</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"id\":      1\n  \"active\":  true,\n  \"message\": \"some text\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "http://127.0.0.1:8888/api/messages/update",
        "type": "js"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"data\": {\n    \"changes\": 1\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"errno\": 1\n  \"code\": \"SQLITE_ERROR\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/message/manager.ts",
    "groupTitle": "Messages",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:8888/api/messages/update"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/playlists/insert-content",
    "title": "Insert Content",
    "version": "0.0.1",
    "name": "InsertContent",
    "group": "Playlist",
    "description": "<p>Insert Content(fields of playlist) in DB. Return all inserted fields of playlists + full assets</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "listId",
            "description": "<p>required parameter angd must be &gt; 0.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "assetId",
            "description": "<p>required parameter angd must be &gt; 0.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "afterId",
            "description": "<p>required parameter angd must be !&lt; 0.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "duration",
            "description": "<p>optional</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"listId\":7,\n  \"assetId\": 3,\n  \"afterId\":6\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "http://127.0.0.1:8888/api/messages/insert",
        "type": "js"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n  {\n   \"data\": [\n     {\n       \"id\": 30,\n       \"originalName\": \"face.png\",\n       \"path\": \"/clientAssets/uploads/userImages/_1468363584469_face.png\",\n       \"thumb\": \"/clientAssets/uploads/thumbnails/_1468363584469_face.png\",\n       \"size\": 132545,\n       \"width\": 350,\n       \"height\": 350,\n       \"mime\": \"image/png\",\n       \"orientation\": null,\n       \"active\": null,\n       \"orig_duration\": null,\n       \"listId\": 7,\n       \"assetId\": 3,\n       \"duration\": null,\n       \"afterId\": 6\n     }\n   ]\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"errno\": 1\n  \"code\": \"SQLITE_ERROR\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/playlists/manager.ts",
    "groupTitle": "Playlist",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:8888/api/playlists/insert-content"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/playlists/create-playlist",
    "title": "Create New Playlist",
    "version": "0.0.1",
    "name": "NewPlaylist",
    "group": "Playlist",
    "description": "<p>Create New Playlist ID in DB.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "http://127.0.0.1:8888/api/playlists/create-playlist",
        "type": "js"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n            \"playlistId\": 11\n        }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"errno\": 1\n  \"code\": \"SQLITE_ERROR\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/playlists/manager.ts",
    "groupTitle": "Playlist",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:8888/api/playlists/create-playlist"
      }
    ]
  }
] });
