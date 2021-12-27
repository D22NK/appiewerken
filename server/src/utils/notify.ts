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
    "https://wns2-db5p.notify.windows.com/w/?token=BQYAAAAIbbP9KNDBvlU4DZEPCx23A29NvRyDpK94rfyDWn5XUWd6LWyVT%2fFEsPVDiOSBXbxIJaAij732TI3sCO4mMnjJTpyCQmEtDO7aMOYZVj1Izy%2bxXghNT2tbRsFze%2bdg%2f28bgsyewCEJRpmFd5OND7Lasim8z6c%2fZn38SLl%2bFSeu7tSQpzTxh8lGptN85VaibP3D1aS3Pgge6Lie6IXtACr7yD%2bqpx1S2YDARZVFoo6IGvDBKwx5fydALQIZ2FB13GN9mhYg0GpNzVBAc%2fq4BQ8mHUxOXKYcu9KSXafnqMWpXWiA4Fg%2fLcPyasGhA2IxqwwZFkJiSJ1yXnirjrd0irMS",
  expirationTime: null,
  keys: {
    p256dh:
      "BIsbrGmo6SDywR_1S3iGAb2uv3nA2slCLtyQb0zkxyK5GstZZ0hzD6Zh2bSbIX5P-k7nf7lDCb6BZEjT2L3f6zI",
    auth: "nBKu4MM1gM81pCb7eYMWXQ",
  },
};

export default function notify(bericht: any) {
  webpush.setVapidDetails(
    "mailto:example@yourdomain.org",
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );

  webpush.sendNotification(
    pushSubscription,
    JSON.stringify({
      title: "Shifts",
      body: bericht,
    })
  );
}
