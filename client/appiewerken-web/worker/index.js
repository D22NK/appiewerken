self.addEventListener("push", function onPush(event) {
  event.waitUntil(
    self.registration.showNotification(JSON.parse(event.data.text()).title, {
      body: JSON.parse(event.data.text()).body,
      title: JSON.parse(event.data.text()).title,
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
