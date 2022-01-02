const webpush = require("web-push");

const vapidKeys = {
  publicKey:
    "BBZY7Q3KEtZArAAWMLi_qzWHbH4vAoqPpIXnRhmlUaw0PVs1Kt_2fgLhuaVI5i8MWASBKx3d6W6UoH2U3qChw9U",
  privateKey: "CZtf_JUxmXkCKbzwaKedPPO9BFC99U2rk-GUYDbYAa8",
};

webpush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/faC9BJ6Cq1g:APA91bEHATrU67eXnbVLTDZtymIR4VwQnEUSedFO48a9tDuDVZ7J1jmcj0m037vp_5FKB-p871rgnJEKIU4EC53SpTM6zPOdi74b82r7wllwnYO-eW2366kCAiH31r5XBWMUzIWxDYqh",
  expirationTime: null,
  keys: {
    p256dh:
      "BF7YhCgKb87ZC8Gryzt3V6fLFm-OadJeS8YQofZVlVPDQkXkjz7YsgtanAFO7M2Fxqf_BRB3vNctuBGG0cdud7w",
    auth: "AiDScDE8CjkEgOX_8ahQhQ",
  },
};

export default function notify(title: any, body: any, sub: any, shiftid: any) {
  webpush.setVapidDetails(
    "mailto:example@yourdomain.org",
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );

  webpush.sendNotification(
    sub,
    JSON.stringify({
      title: title,
      body: body,
      shiftid: shiftid,
      actions: [
        { action: "shift", title: "Bekijk" },
        { action: "shifts", title: "Alle Shifts" },
      ],
    })
  );
}
