self.addEventListener("push", function onPush(event) {
  event.waitUntil(
    self.registration.showNotification(JSON.parse(event.data.text()).title, {
      body: JSON.parse(event.data.text()).body,
      title: JSON.parse(event.data.text()).title,
      icon: "https://ahw.d22nk.nl/ah.png",
      actions: [
        { action: `shift-${JSON.parse(event.data.text()).shiftid}`, title: "Bekijk" },
        { action: "shifts", title: "Alle Shifts" },
      ],
    })
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  if (event.action === "shifts") {
    event.waitUntil(clients.openWindow("https://ahw.d22nk.nl/Shifts"));
  } else if (event.action.includes("shift-")) {
    event.waitUntil(
      clients.openWindow(
        `https://ahw.d22nk.nl/Shift/${event.action.split("-")[1]}`
      )
    );
  } else {
    event.waitUntil(clients.openWindow("https://ahw.d22nk.nl/Shiftfollower"));
  }
});
