const params = new URLSearchParams(window.location.search);
    const out = document.getElementById('formData');
    if ([...params].length === 0) {
      out.textContent = 'No data was submitted.';
    } else {
      const dl = document.createElement('dl');
      for (const [k, v] of params) {
        const dt = document.createElement('dt'); dt.textContent = k;
        const dd = document.createElement('dd'); dd.textContent = v;
        dl.appendChild(dt); dl.appendChild(dd);
      }
      out.appendChild(dl);
    }