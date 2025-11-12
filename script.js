document.getElementById("userForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const photoFile = document.getElementById("photo").files[0];

  if (!photoFile) {
    alert("Please upload a photo!");
    return;
  }

  // check file size (max 10MB)
  if (photoFile.size > 10 * 1024 * 1024) {
    alert("Image too large! Please upload below 10MB.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const photoBase64 = reader.result;

    const userId = "user_" + Date.now();
    const userData = { name, email, photo: photoBase64 };
    localStorage.setItem(userId, JSON.stringify(userData));

    // ✅ Fixed QR URL (for local files too)
    const basePath = window.location.href.replace("index.html", "");
    const qrUrl = `https://jakaria53.github.io/QR-Code-with-Profile/scan.html?id=${userId}`;


    const qr = new QRious({
      element: document.getElementById("qrCode"),
      size: 200,
      value: qrUrl,
    });

    document.getElementById("qrSection").style.display = "block";
  };
  reader.readAsDataURL(photoFile);
});
