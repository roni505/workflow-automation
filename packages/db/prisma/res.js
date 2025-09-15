{
    "data": {
        "createdAt": "2025-09-14T05:05:16.638Z",
        "updatedAt": "2025-09-15T09:50:46.000Z",
        "id": "RXb3bAenBdJXhttY",
        "name": "Ready for dev",
        "active": false,
        "isArchived": false,
        "nodes": [
            {
                "parameters": {},
                "type": "n8n-nodes-base.manualTrigger",
                "typeVersion": 1,
                "position": [
                    0,
                    0
                ],
                "id": "03803bf4-9e93-41f4-a5db-71fcc1570b02",
                "name": "When clicking ‘Execute workflow’"
            },
            {
                "parameters": {
                    "operation": "sendAndWait",
                    "options": {}
                },
                "type": "n8n-nodes-base.telegram",
                "typeVersion": 1.2,
                "position": [
                    208,
                    0
                ],
                "id": "c5ee74c6-401b-4f8d-aecd-fa4bdba838bd",
                "name": "Send a text message",
                "webhookId": "c7c18d8d-5ba2-45c6-89f4-9ebfd8584d2d"
            },
            {
                "parameters": {
                    "operation": "send",
                    "additionalFields": {}
                },
                "type": "n8n-nodes-base.whatsApp",
                "typeVersion": 1,
                "position": [
                    624,
                    0
                ],
                "id": "8f5a5dce-62b9-4dbe-8662-dacdce0a1a86",
                "name": "Send message",
                "webhookId": "a7449a05-39e6-4c9b-9708-876d7b2ef0da"
            },
            {
                "parameters": {
                    "resource": "file",
                    "owner": {
                        "__rl": true,
                        "mode": "list",
                        "value": ""
                    },
                    "repository": {
                        "__rl": true,
                        "mode": "list",
                        "value": ""
                    }
                },
                "type": "n8n-nodes-base.github",
                "typeVersion": 1.1,
                "position": [
                    416,
                    0
                ],
                "id": "fca633ae-6fc6-4317-845f-ea34da4fc0fa",
                "name": "Create a file",
                "webhookId": "94ae911b-9f3b-4f02-b43d-3fee5abb8be6"
            }
        ],
        "connections": {
            "When clicking ‘Execute workflow’": {
                "main": [
                    [
                        {
                            "node": "Send a text message",
                            "type": "main",
                            "index": 0
                        }
                    ]
                ] 
            },
            "Send a text message": {
                "main": [
                    [
                        {
                            "node": "Create a file",
                            "type": "main",
                            "index": 0
                        }
                    ]
                ]
            },
            "Create a file": {
                "main": [
                    [
                        {
                            "node": "Send message",
                            "type": "main",
                            "index": 0
                        }
                    ]
                ]
            }
        },
        "settings": {
            "executionOrder": "v1"
        },
        "staticData": null,
        "meta": null,
        "pinData": {},
        "versionId": "897fe782-db81-4638-991a-0cb9904145dc",
        "triggerCount": 0,
        "tags": [],
        "scopes": [
            "workflow:create",
            "workflow:delete",
            "workflow:execute",
            "workflow:list",
            "workflow:move",
            "workflow:read",
            "workflow:share",
            "workflow:update"
        ]
    }
}