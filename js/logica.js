// Configuración de datos
const telefonoWhatsApp = "+504 9516-6590"; // Tu número con código de país 504
const mensajeWhatsApp = encodeURIComponent("¡Hola Ing. Vásquez! Me interesa recibir información sobre sus servicios.");

// Pega aquí la URL que te dio Apps Script
const scriptURL = "https://script.google.com/macros/s/AKfycbyqb-BOekqIdlWgbXYHCmgiP5Q1PxvPemD9iNvzsNjbj3OfxuEf3I7ckFmTSCsENWvD/exec"; 

document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Enlaces automáticos a WhatsApp
  const urlWhatsApp = `https://wa.me/${telefonoWhatsApp}?text=${mensajeWhatsApp}`;
  const btnHeroWA = document.getElementById("btn-whatsapp-hero");
  const btnDirectWA = document.getElementById("btn-whatsapp-direct");

  if (btnHeroWA) btnHeroWA.href = urlWhatsApp;
  if (btnDirectWA) btnDirectWA.href = urlWhatsApp;

  // 2. Envío del formulario
  const form = document.getElementById("form-contacto");
  const statusText = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      statusText.innerText = "Enviando mensaje...";
      statusText.style.color = "#2563eb";

      const datos = {
        nombre: document.getElementById("nombre").value,
        correo: document.getElementById("correo").value,
        telefono: document.getElementById("telefono").value,
        mensaje: document.getElementById("mensaje").value
      };

      fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
      })
      .then(() => {
        statusText.innerText = "¡Mensaje enviado con éxito! Te responderé lo antes posible.";
        statusText.style.color = "#16a34a";
        form.reset();
      })
      .catch((error) => {
        console.error("Error al enviar:", error);
        statusText.innerText = "Hubo un problema al enviar el mensaje. Inténtalo de nuevo.";
        statusText.style.color = "#dc2626";
      });
    });
  }
});