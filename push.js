var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BDMQ8D66kCr4t6crI-7Jr_iM1DfmlbMy5kHQu3RlFPEOtexFkyZlENWDJtiLTS5vXFflVPGelOEf7zg1ZapxcHE",
    "privateKey": "ScDzYpBz2XJwAg-AWB9Rr24zUqZGcaFYsLF3KciVO_A"
};


webPush.setVapidDetails(
    'mailto:drholix@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cyxYVzxbhQA:APA91bF8C4h5SifaP_DibrlyPoVgJQUlcLNTBWOca7ZMdjA67hm3f8z5ExNmsn05idUn1LzrsIB7_E695D8yI1eUqAy6yVJxjA3m0ydHbkjDx63wLBN_IvkFtPP-ejEYSi0Edsd8iRZv",
    "keys": {
        "p256dh": "BMgFVnSCF0oLJRPH97VvvibfAH1ehZCpP3pWPb4w5tqI92LPQhj3WW8rCdmH+VVSI1yWFa2XDUNScni2ryViCpw=",
        "auth": "zYeuZKdELbi7mwJzz36kOw=="
    }
};
var payload = 'Hey Cloud, you got notif!';
var options = {
    gcmAPIKey: '643776895648',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);