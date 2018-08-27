Step  to Run Server

1. cd websocket
2. npm install
3. node index.js


Steps to run client // made using npm install -g create-react-app

1. cd client-chat-app
2. npm install
3. npm start
4. open http://localhost:3000 in multiple tabs


Description :

1. Left window shows list of active users
2. right side shows messages
3. It supports private and broadcast messages.
4. private msg are also allowed to be send, for that enter the person name in left panel and click Select Toggle button , it turns green , then type your message . On clicking Select Toggle again color chnges to pink and you can again broadcats messages.

Issues : 
1. For sending messags first time send button needs ot be clicked twice, this is a design flaw from my side.
2. if you select a person for unicast and click Select Toggle again, the message is sent as private message instead of broadcast, but the next message is sent in broadcast, the state in the component were not updating them instantly, update in toggle happened after one private message is send. But private message are sent without any failure 