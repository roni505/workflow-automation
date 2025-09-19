// {
//     "data": {
//         "createdAt": "2025-09-15T10:43:59.106Z",
//         "updatedAt": "2025-09-15T10:50:19.000Z",
//         "id": "KpdkQydnHFUodKTX",
//         "name": "My workflow",
//         "active": false,
//         "isArchived": false,
//         "nodes": [
//             {
//                 "parameters": {},
//                 "type": "n8n-nodes-base.manualTrigger",
//                 "typeVersion": 1,
//                 "position": [
//                     0,
//                     0
//                 ],
//                 "id": "5834deee-9088-46b0-afb2-e061a8b28b1a",
//                 "name": "When clicking ‘Execute workflow’"
//             },
//             {
//                 "parameters": {
//                     "resource": "chat"
//                 },
//                 "type": "n8n-nodes-base.telegram",
//                 "typeVersion": 1.2,
//                 "position": [
//                     208,
//                     0
//                 ],
//                 "id": "3751a2e6-914c-4b70-93fc-fe10e76c34e3",
//                 "name": "Get a chat",
//                 "webhookId": "e6902dde-a746-45aa-a386-4d6bbfe29baf"
//             },
//             {
//                 "parameters": {
//                     "operation": "send",
//                     "additionalFields": {}
//                 },
//                 "type": "n8n-nodes-base.whatsApp",
//                 "typeVersion": 1,
//                 "position": [
//                     240,
//                     -176
//                 ],
//                 "id": "4d129ff6-b057-4197-a696-9cd9325bcda5",
//                 "name": "Send message",
//                 "webhookId": "2f06f044-5f55-4a2a-b9c0-3b4ad478eaf2"
//             },
//             {
//                 "parameters": {
//                     "operation": "get"
//                 },
//                 "type": "n8n-nodes-base.gmail",
//                 "typeVersion": 2.1,
//                 "position": [
//                     224,
//                     192
//                 ],
//                 "id": "612a4804-4744-473e-80c7-b50d031b2296",
//                 "name": "Get a message",
//                 "webhookId": "8029bff1-ac2f-45fe-8532-a41043f1e93d"
//             }
//         ],
//         "connections": {
//             "When clicking ‘Execute workflow’": {
//                 "main": [
//                     [
//                         {
//                             "node": "Get a chat",
//                             "type": "main",
//                             "index": 0
//                         },
//                         {
//                             "node": "Send message",
//                             "type": "main",
//                             "index": 0
//                         },
//                         {
//                             "node": "Get a message",
//                             "type": "main",
//                             "index": 0
//                         }
//                     ]
//                 ]
//             }
//         },
//         "settings": {
//             "executionOrder": "v1"
//         },
//         "staticData": null,
//         "meta": {
//             "templateCredsSetupCompleted": true
//         },
//         "pinData": {},
//         "versionId": "4333ffa6-be6e-4952-8a89-c5280a2342d4",
//         "triggerCount": 0,
//         "tags": [],
//         "parentFolder": null,
//         "homeProject": {
//             "id": "dfAHwtyy7JUhODxG",
//             "type": "team",
//             "name": "My project",
//             "icon": {
//                 "type": "icon",
//                 "value": "layers"
//             }
//         },
//         "sharedWithProjects": [],
//         "usedCredentials": [],
//         "scopes": [
//             "workflow:create",
//             "workflow:delete",
//             "workflow:execute",
//             "workflow:list",
//             "workflow:move",
//             "workflow:read",
//             "workflow:share",
//             "workflow:update"
//         ]
//     }
// }
