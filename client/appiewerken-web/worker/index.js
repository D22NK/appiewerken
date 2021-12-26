self.addEventListener("push", function onPush(event) {
  event.waitUntil(
    self.registration.showNotification(event.data.text(), {
      icon: "https://static.ah.nl/ah-static/images/logo-ah.png",
      actions: [{ action: "shifts", title: "Alle Shifts" }],
    })
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  if (event.action === "shifts") {
    event.waitUntil(
      clients.openWindow("https://appiewerken.vercel.app/Shifts")
    );
  } else {
    event.waitUntil(clients.openWindow("https://ah.nl"));
  }
});
