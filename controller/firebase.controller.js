const admin = require("firebase-admin");

async function sendNotification(request, response, authJson) {
    const { deviceToken, payload } = request.body;
    admin.initializeApp({ credential: admin.credential.cert(authJson) });

    const data = payload.data;
    const dataPayload = {};
    if (data != null && Array.isArray(data) && data.length > 0) {
        data.forEach(item => {
            dataPayload[item.title] = item.value;
        });
    }

    const jsonPayload = {
        token: deviceToken,
        notification: {
            title: payload.notification.title,
            body: payload.notification.body
        },
        data: dataPayload
    }

    console.log('FCM Push Payload: ' + JSON.stringify(jsonPayload));

    admin
        .messaging()
        .send(jsonPayload)
        .then(fcmResponse => {
            console.log('Message sent', fcmResponse);
            deleteApp();
            return response.status(200).json({ success: true, message: 'Success', data: fcmResponse });
        })
        .catch(error => {
            console.error('Error sending message', error);
            deleteApp();
            return response.status(200).json({ success: false, message: 'Error sending push : ' + error });
        })
}

async function deleteApp() {
    const app = admin.app();
    app.delete();
}

module.exports = { sendNotification };