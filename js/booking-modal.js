/**
 * Woodlawn Auto Centre - Booking Modal JavaScript
 * Quick quote / booking request modal with form validation and WhatsApp direct messaging.
 */

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('bookingModal');
  const openButtons = document.querySelectorAll('.open-booking-modal, a[href="#book"]');
  const closeBtn = document.querySelector('.modal-close-btn');
  const form = document.getElementById('quickBookingForm');
  const formSuccess = document.getElementById('bookingFormSuccess');

  if (!modal) return;

  function openModal(serviceName = '') {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (serviceName && form) {
      const serviceSelect = form.querySelector('#bookingService');
      if (serviceSelect) {
        serviceSelect.value = serviceName;
      }
    }
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service') || '';
      openModal(service);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = form.querySelector('#bookingName').value.trim();
      const phone = form.querySelector('#bookingPhone').value.trim();
      const reg = form.querySelector('#bookingReg').value.trim();
      const service = form.querySelector('#bookingService').value;
      const date = form.querySelector('#bookingDate').value;
      const notes = form.querySelector('#bookingNotes') ? form.querySelector('#bookingNotes').value.trim() : '';

      // Format WhatsApp message
      const text = `Hello Woodlawn Auto Centre, I'd like to book an appointment:%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Car Reg:* ${encodeURIComponent(reg)}%0A*Service:* ${encodeURIComponent(service)}%0A*Preferred Date:* ${encodeURIComponent(date)}${notes ? '%0A*Notes:* ' + encodeURIComponent(notes) : ''}`;
      
      const whatsappUrl = `https://wa.me/442088941951?text=${text}`;

      // Show success state
      if (formSuccess) {
        form.style.display = 'none';
        formSuccess.style.display = 'block';
        
        const waLink = formSuccess.querySelector('#whatsappDirectLink');
        if (waLink) {
          waLink.href = whatsappUrl;
        }
      } else {
        window.open(whatsappUrl, '_blank');
        closeModal();
      }
    });
  }
});
