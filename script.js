const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showStatus(message, color) {
  formStatus.textContent = message;
  formStatus.style.color = color;
}

contactForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  const nama = document.getElementById('nama').value.trim();
  const email = document.getElementById('email').value.trim();
  const pesan = document.getElementById('pesan').value.trim();

  if (!nama || !email || !pesan) {
    showStatus('Harap isi semua field sebelum mengirim pesan.', '#d93025');
    return;
  }

  if (!EMAIL_PATTERN.test(email)) {
    showStatus('Format email tidak valid. Contoh: nama@email.com', '#d93025');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Mengirim...';
  showStatus('Mengirim pesan...', '#64748b');

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: 'c66414f5-06cb-4e54-ba69-3e496a850457',
        subject: 'Pesan baru dari portofolio',
        nama: nama,
        email: email,
        pesan: pesan,
        from_name: nama,
        reply_to: email
      })
    });

    const result = await response.json();

    if (result.success) {
      showStatus(`Terima kasih, ${nama}! Pesan Anda berhasil dikirim.`, '#188038');
      contactForm.reset();

      setTimeout(function () {
        showStatus('', '');
      }, 6000);
    } else {
      showStatus('Gagal mengirim pesan. Coba lagi nanti.', '#d93025');
    }
  } catch (error) {
    showStatus('Tidak ada koneksi. Periksa internet lalu coba lagi.', '#d93025');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Kirim Pesan';
  }
});
