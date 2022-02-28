self.addEventListener("push", function onPush(event) {
  event.waitUntil(
    self.registration.showNotification(JSON.parse(event.data.text()).title, {
      body: JSON.parse(event.data.text()).body,
      title: JSON.parse(event.data.text()).title,
      icon: "https://ahw.d22nk.nl/ah.png",
      
    })
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

    event.waitUntil(clients.openWindow("https://ahw.d22nk.nl/Shiftfollower"));
  
});
