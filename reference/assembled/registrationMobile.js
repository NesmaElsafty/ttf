(function(){
  const form = document.getElementById('ttfns-form');
  const webhookURL = "https://services.leadconnectorhq.com/hooks/9LHVl0sw8gABEkuoMC1s/webhook-trigger/28d257a9-5c8b-42fd-9279-3d3e72166ef7"; // 🔗 ضع رابطك هنا

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name.value?.trim(),
      email: form.email.value?.trim(),
      whatsapp: form.whatsapp.value?.trim(),
      source: "TTF Glass CTA (no-bg)"
    };

    if(!payload.name || !payload.email || !payload.whatsapp){
      alert("⚠️ Please fill in all required fields.");
      return;
    }

    try {
      const res = await fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("✅ Thank you! Your info has been sent successfully.");
        form.reset();
      } else {
        alert("⚠️ Submission failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Network error. Please check your connection.");
    }
  });
})();