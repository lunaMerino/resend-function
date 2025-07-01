const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event, context) => {
  // Permitir solicitudes desde tu frontend
  const headers = {
    'Access-Control-Allow-Origin': 'https://aguadolopez.github.io',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Manejo del preflight OPTIONS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: 'OK',
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const { nombre, email, telefono, subject, message } = data;

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'aguadolopezsebastian5@gmail.com',
      subject,
      html: `
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong><br>${message}</p>
      `,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Error al enviar el correo' }),
    };
  }
};
