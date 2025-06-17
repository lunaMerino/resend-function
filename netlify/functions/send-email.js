const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event, context) => {
  const data = JSON.parse(event.body || '{}');

  try {
    const { nombre, email, telefono, subject, message } = data;

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'tucorreo@ejemplo.com',
      subject,
      html: `
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong><br>${message}</p>
      `
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al enviar el correo' })
    };
  }
};