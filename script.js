function sendWebhook() {

  const url = document.getElementById("url").value;
  const username = document.getElementById("username").value;
  const avatar = document.getElementById("avatar").value;
  const content = document.getElementById("content").value;

  const embedTitle = document.getElementById("embedTitle").value;
  const embedDesc = document.getElementById("embedDesc").value;
  const embedColor = document.getElementById("embedColor").value;

  const fileInput = document.getElementById("file").files[0];
  const status = document.getElementById("status");

  if (!url) {
    status.innerText = "웹훅 URL 입력";
    return;
  }

  // 파일 있으면 multipart
  if (fileInput) {

    const form = new FormData();

    const payload = {
      username: username,
      avatar_url: avatar,
      content: content,
      embeds: embedTitle || embedDesc ? [{
        title: embedTitle,
        description: embedDesc,
        color: parseInt(embedColor || "5865f2", 16)
      }] : []
    };

    form.append(
      "payload_json",
      JSON.stringify(payload)
    );

    form.append("file", fileInput);

    fetch(url, {
      method: "POST",
      body: form
    })
    .then(()=> status.innerText="전송 완료");

  } else {

    // 일반 JSON 전송
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        avatar_url: avatar,
        content: content,
        embeds: embedTitle || embedDesc ? [{
          title: embedTitle,
          description: embedDesc,
          color: parseInt(embedColor || "5865f2", 16)
        }] : []
      })
    })
    .then(()=> status.innerText="전송 완료");

  }

}
