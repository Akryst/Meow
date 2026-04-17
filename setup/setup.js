(function () {
  const TZ_LIST = [
    'America/New_York','America/Chicago','America/Denver','America/Los_Angeles',
    'America/Phoenix','America/Anchorage','America/Adak','Pacific/Honolulu',
    'America/Toronto','America/Vancouver','America/Mexico_City',
    'America/Hermosillo','America/Bogota','America/Lima','America/Sao_Paulo',
    'America/Argentina/Buenos_Aires',
    'Europe/London','Europe/Paris','Europe/Berlin','Europe/Madrid',
    'Europe/Rome','Europe/Amsterdam','Europe/Brussels','Europe/Warsaw',
    'Europe/Prague','Europe/Stockholm','Europe/Oslo','Europe/Helsinki',
    'Europe/Lisbon','Europe/Athens','Europe/Istanbul','Europe/Bucharest',
    'Europe/Kiev','Europe/Moscow',
    'Asia/Dubai','Asia/Karachi','Asia/Kolkata','Asia/Dhaka',
    'Asia/Bangkok','Asia/Singapore','Asia/Tokyo','Asia/Seoul',
    'Asia/Shanghai','Asia/Hong_Kong','Asia/Taipei',
    'Australia/Sydney','Australia/Melbourne','Australia/Perth',
    'Pacific/Auckland','Pacific/Fiji',
    'Africa/Cairo','Africa/Lagos','Africa/Nairobi','Africa/Johannesburg',
  ];
  const sel = document.getElementById('timezone');
  let detected = 'America/New_York';
  try { detected = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (e) {}
  TZ_LIST.forEach(tz => {
    const opt = document.createElement('option');
    opt.value = tz;
    opt.textContent = tz.replace(/_/g, ' ');
    if (tz === detected) opt.selected = true;
    sel.appendChild(opt);
  });
  if (!TZ_LIST.includes(detected)) {
    const opt = document.createElement('option');
    opt.value = detected;
    opt.textContent = detected.replace(/_/g, ' ');
    opt.selected = true;
    sel.insertBefore(opt, sel.firstChild);
  }
})();

let currentStep = 1;
const TOTAL = 5;

function goTo(step) {
  if (step < 1 || step > TOTAL) return;
  if (step > currentStep && !validateStep(currentStep)) return;

  document.getElementById(`panel-${currentStep}`).classList.remove('active');
  document.getElementById(`tab-${currentStep}`).classList.remove('active');
  if (currentStep < step) document.getElementById(`tab-${currentStep}`).classList.add('done');

  currentStep = step;
  document.getElementById(`panel-${step}`).classList.add('active');
  document.getElementById(`tab-${step}`).classList.add('active');
  document.getElementById(`tab-${step}`).classList.remove('done');

  if (step === TOTAL) buildReview();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function validateStep(step) {
  if (step === 1) {
    const name = document.getElementById('name').value.trim();
    const desc = document.getElementById('description').value.trim();
    if (!name) { alert('Please enter your display name.'); return false; }
    if (!desc) { alert('Please enter a description.'); return false; }
  }
  if (step === 3) {
    if (document.getElementById('discordEnabled').checked) {
      const uid = document.getElementById('discordUserId').value.trim();
      if (!uid || !/^\d{15,20}$/.test(uid)) {
        alert('Please enter a valid Discord User ID (15-20 digits).');
        return false;
      }
    }
    if (document.getElementById('lastfmEnabled').checked) {
      const key = document.getElementById('lastfmApiKey').value.trim();
      const user = document.getElementById('lastfmUsername').value.trim();
      if (!key || !user) { alert('Please fill in both Last.fm API Key and Username.'); return false; }
    }
  }
  return true;
}

function toggleSection(id, show) {
  document.getElementById(id).style.display = show ? 'block' : 'none';
}

function toggleBgUpload(type) {
  document.getElementById('bg-upload-area').style.display = type === 'image' ? 'block' : 'none';
}

function setupPreview(inputId, previewId, iconId, hintId) {
  document.getElementById(inputId).addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      const preview = document.getElementById(previewId);
      const icon    = document.getElementById(iconId);
      const hint    = document.getElementById(hintId);
      preview.src = e.target.result;
      preview.style.display = 'block';
      icon.style.display = 'none';
      hint.textContent = file.name;
    };
    reader.readAsDataURL(file);
  });
}

setupPreview('profile-file', 'profile-preview', 'profile-icon', 'profile-hint');
setupPreview('bg-file', 'bg-preview', 'bg-icon', 'bg-hint');

function buildReview() {
  const form = document.getElementById('setup-form');
  const d = formValues(form);
  const socials = ['github', 'twitter', 'steam', 'vrchat', 'osu', 'instagram', 'tiktok', 'youtube', 'namemc']
    .filter(k => d[k]).join(', ') || 'none';

  document.getElementById('review-box').innerHTML = `
    <table style="width:100%;border-collapse:collapse">
      ${reviewRow('Name', d.name)}
      ${reviewRow('Description', d.description)}
      ${reviewRow('Timezone', d.timezone)}
      ${reviewRow('Profile image', document.getElementById('profile-file').files[0]?.name || 'none uploaded')}
      ${reviewRow('Background', d.backgroundType === 'image'
        ? (document.getElementById('bg-file').files[0]?.name || 'none uploaded')
        : 'video (upload manually)')}
      ${reviewRow('Social links', socials)}
      ${reviewRow('Discord', document.getElementById('discordEnabled').checked ? '✅ ' + d.discordUserId : '—')}
      ${reviewRow('Last.fm', document.getElementById('lastfmEnabled').checked ? '✅ ' + d.lastfmUsername : '—')}
      ${reviewRow('Locations', document.getElementById('locationsEnabled').checked ? '✅' : '—')}
      ${reviewRow('Font', d.fontFamily)}
    </table>
  `;
}

function reviewRow(label, val) {
  return `<tr>
    <td style="color:var(--muted);padding:3px 0;width:40%">${label}</td>
    <td style="color:var(--text)">${val || '—'}</td>
  </tr>`;
}

function formValues(form) {
  const data = {};
  new FormData(form).forEach((v, k) => { data[k] = v; });
  return data;
}

document.getElementById('setup-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const locRaw = document.getElementById('locationsRaw').value.trim();
  if (locRaw) {
    const arr = locRaw.split('\n').map(s => s.trim()).filter(Boolean);
    let hidden = document.getElementById('locations-hidden');
    if (!hidden) {
      hidden = document.createElement('input');
      hidden.type = 'hidden';
      hidden.name = 'locations';
      hidden.id = 'locations-hidden';
      e.target.appendChild(hidden);
    }
    hidden.value = JSON.stringify(arr);
  }

  ['discordEnabled', 'lastfmEnabled', 'locationsEnabled'].forEach(id => {
    const el = document.getElementById(id);
    let hidden = document.getElementById(id + '-hidden');
    if (!hidden) {
      hidden = document.createElement('input');
      hidden.type = 'hidden';
      hidden.id = id + '-hidden';
      hidden.name = id;
      e.target.appendChild(hidden);
    }
    hidden.value = el.checked ? 'true' : 'false';
    el.disabled = true;
  });

  document.getElementById('overlay').classList.add('show');

  try {
    const fd = new FormData(e.target);
    const resp = await fetch('/setup', { method: 'POST', body: fd });
    const json = await resp.json();

    if (!resp.ok || !json.success) throw new Error(json.error || 'Unknown error');

    document.getElementById('overlay-spinner').style.display = 'none';
    document.getElementById('overlay-title').textContent = '✅ All done!';
    document.getElementById('overlay-msg').textContent = 'Redirecting to your page…';
    setTimeout(() => { window.location.href = '/'; }, 1800);
  } catch (err) {
    document.getElementById('overlay').classList.remove('show');
    const box = document.getElementById('error-box');
    box.textContent = 'Error: ' + err.message;
    box.style.display = 'block';
    ['discordEnabled', 'lastfmEnabled', 'locationsEnabled'].forEach(id => {
      document.getElementById(id).disabled = false;
    });
  }
});
