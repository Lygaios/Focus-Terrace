<template>
  <div class="page">
    <div class="content-container">
      <h2>Imprint</h2>
      <div class="imprint-content">
        <p>
          This website is a study project, created for educational purposes. It is not intended for commercial use.
        </p>
        
        <div class="contact-info">
          <p><strong>Website created by:</strong></p>
          <p>
            Joshua Brunke<br />
            Über der Kieckwiese 3<br />
            38729 Langelsheim<br />
            Germany<br />
            Tel.: +49(5383)9079151<br />
            Email: joshuabrunke1@gmail.com
          </p>
        </div>
      </div>
      
      <div class="footer-info">
        <p>© 2025-26 Joshua Brunke. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Imprint page component
</script>

<style scoped>
.page {
  max-width: 800px;
  margin: 0 auto;
}

.content-container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem;
}

h2 {
  color: #2c3e50;
  margin-bottom: 2rem;
  font-weight: 300;
  font-size: 2rem;
  text-align: center;
}

.imprint-content {
  margin-bottom: 2rem;
}

.imprint-content p {
  color: #34495e;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.contact-info {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  margin-top: 1.5rem;
}

.contact-info p {
  margin-bottom: 1rem;
}

.contact-info p:last-child {
  margin-bottom: 0;
  line-height: 1.8;
}

.contact-info strong {
  color: #2c3e50;
  font-weight: 500;
}

.footer-info {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 1.5rem;
}

.footer-info p {
  color: #34495e;
  font-size: 0.9rem;
  opacity: 0.8;
  margin: 0;
}
</style>