// {
//     "data": {
//         "createdAt": "2025-09-15T10:43:59.106Z",
//         "updatedAt": "2025-09-15T10:57:11.000Z",
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
//                     416,
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
//                     448,
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
//                     432,
//                     192
//                 ],
//                 "id": "612a4804-4744-473e-80c7-b50d031b2296",
//                 "name": "Get a message",
//                 "webhookId": "8029bff1-ac2f-45fe-8532-a41043f1e93d"
//             },
//             {
//                 "parameters": {
//                     "options": {}
//                 },
//                 "type": "@n8n/n8n-nodes-langchain.agent",
//                 "typeVersion": 2.2,
//                 "position": [
//                     128,
//                     -272
//                 ],
//                 "id": "c0093e37-91de-4ee4-9942-625221246315",
//                 "name": "AI Agent"
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
//                             "node": "Get a message",
//                             "type": "main",
//                             "index": 0
//                         },
//                         {
//                             "node": "AI Agent",
//                             "type": "main",
//                             "index": 0
//                         }
//                     ],
//                 ]
//             },
//             "AI Agent": {
//                 "main": [
//                     [
//                         {
//                             "node": "Send message",
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
//         "versionId": "41e2cfc8-29a0-4798-95b4-d0e99153e232",
//         "triggerCount": 0,
//         "tags": [],
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
