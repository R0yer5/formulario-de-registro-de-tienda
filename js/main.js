document.addEventListener('DOMContentLoaded', () => {
  // Generar copos de nieve dinámicos de fondo
  createSnowflakes();

  const form = document.getElementById('storeForm');
  const btnSubmit = document.getElementById('btnSubmit');
  const btnText = document.getElementById('btnText');
  const phoneInput = document.getElementById('phone');

  // RESTRICCIÓN EN TIEMPO REAL: Bloquear cualquier caracter que no sea número
  phoneInput.addEventListener('input', (e) => {
    // Elimina todo lo que no sea dígito numérico (0-9)
    phoneInput.value = phoneInput.value.replace(/[^0-9]/g, '');
  });

  // Manejo del envío del formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fields = [
      { id: 'storeName', value: document.getElementById('storeName').value.trim() },
      { id: 'ownerName', value: document.getElementById('ownerName').value.trim() },
      { id: 'phone', value: phoneInput.value.trim() },
      { id: 'address', value: document.getElementById('address').value.trim() }
    ];

    let isValid = true;

    // 1. Validar campos obligatorios vacíos
    fields.forEach(field => {
      const input = document.getElementById(field.id);
      const group = input.closest('.field-group');

      if (!field.value) {
        group.classList.add('invalid');
        isValid = false;
      } else {
        group.classList.remove('invalid');
      }
    });

    // 2. Validación específica para el teléfono (Debe tener exactamente 9 dígitos)
    const phoneGroup = phoneInput.closest('.field-group');
    if (fields[2].value.length !== 9) {
      phoneGroup.classList.add('invalid');
      isValid = false;
    }

    if (!isValid) {
      const firstInvalid = document.querySelector('.field-group.invalid input');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Animación visual del botón
    btnSubmit.disabled = true;
    btnText.textContent = "⏳ Abriendo WhatsApp...";

    // Número oficial de la campaña (+51 para Perú)[cite: 1]
    const phoneNumber = "51914107757";

    // Mensaje formateado para WhatsApp
    const message = `🐾 *¡NUEVA TIENDA SOCIA REGISTRADA!* 🐾\n` +
      `----------------------------------\n` +
      `🏪 *Tienda / Negocio:* ${fields[0].value}\n` +
      `👤 *Representante:* ${fields[1].value}\n` +
      `📞 *Teléfono:* ${fields[2].value}\n` +
      `📍 *Dirección:* ${fields[3].value}\n` +
      `----------------------------------\n` +
      `✨ *Origen:* Formulario Web QR`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Redirección limpia a WhatsApp
    setTimeout(() => {
      window.location.href = whatsappUrl;
      btnSubmit.disabled = false;
      btnText.textContent = "🐾 Unirme y Enviar por WhatsApp";
    }, 600);
  });

  // Limpieza de advertencias de error al escribir
  const inputs = document.querySelectorAll('.field-group input');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.value.trim() !== '') {
        input.closest('.field-group').classList.remove('invalid');
      }
    });
  });
});

// Función para animar copos de nieve
function createSnowflakes() {
  const container = document.getElementById('snowContainer');
  const icons = ['❄', '✨', '🐾'];
  
  for (let i = 0; i < 18; i++) {
    const flake = document.createElement('div');
    flake.classList.add('snowflake');
    flake.textContent = icons[Math.floor(Math.random() * icons.length)];
    flake.style.left = `${Math.random() * 100}%`;
    flake.style.animationDuration = `${4 + Math.random() * 6}s`;
    flake.style.animationDelay = `${Math.random() * 5}s`;
    flake.style.fontSize = `${0.8 + Math.random() * 0.7}rem`;
    container.appendChild(flake);
  }
}