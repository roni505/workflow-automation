// {
//     "data": {
//         "createdAt": "2025-09-15T10:43:59.106Z",
//         "updatedAt": "2025-09-15T16:53:58.000Z",
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
//                     768,
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
//                     768,
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
//                     768,
//                     208
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
//                     368,
//                     -736
//                 ],
//                 "id": "c0093e37-91de-4ee4-9942-625221246315",
//                 "name": "AI Agent"
//             },
//             {
//                 "parameters": {
//                     "model": {
//                         "__rl": true,
//                         "mode": "list",
//                         "value": "claude-sonnet-4-20250514",
//                         "cachedResultName": "Claude 4 Sonnet"
//                     },
//                     "options": {}
//                 },
//                 "type": "@n8n/n8n-nodes-langchain.lmChatAnthropic",
//                 "typeVersion": 1.3,
//                 "position": [
//                     368,
//                     -496
//                 ],
//                 "id": "69772c7b-8331-427e-96b5-5a4e4b1f38d1",
//                 "name": "Anthropic Chat Model"
//             },
//             {
//                 "parameters": {},
//                 "type": "@n8n/n8n-nodes-langchain.memoryMotorhead",
//                 "typeVersion": 1.3,
//                 "position": [
//                     464,
//                     -352
//                 ],
//                 "id": "754f2e97-0f68-4708-8f29-cf168bc4e8ee",
//                 "name": "Motorhead"
//             },
//             {
//                 "parameters": {
//                     "options": {}
//                 },
//                 "type": "n8n-nodes-base.httpRequestTool",
//                 "typeVersion": 4.2,
//                 "position": [
//                     512,
//                     -224
//                 ],
//                 "id": "f42bb267-29f5-4e8c-baf7-32cf7cfb1aa5",
//                 "name": "HTTP Request"
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
//                     ]
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
//             },
//             "Anthropic Chat Model": {
//                 "ai_languageModel": [
//                     [
//                         {
//                             "node": "AI Agent",
//                             "type": "ai_languageModel",
//                             "index": 0
//                         }
//                     ]
//                 ]
//             },
//             "Motorhead": {
//                 "ai_memory": [
//                     [
//                         {
//                             "node": "AI Agent",
//                             "type": "ai_memory",
//                             "index": 0
//                         }
//                     ]
//                 ]
//             },
//             "HTTP Request": {
//                 "ai_tool": [
//                     [
//                         {
//                             "node": "AI Agent",
//                             "type": "ai_tool",
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
//         "versionId": "5a9d8264-ba05-4fd4-b78d-21ef686937f4",
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
