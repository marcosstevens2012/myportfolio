const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });

// Configuración del transportador de email
const transporter = nodemailer.createTransporter({
  service: "gmail",
  auth: {
    user: "marcosstevens.web@gmail.com",
    pass: "tu_app_password_aqui", // Necesitarás generar una contraseña de aplicación
  },
});

exports.sendContactEmail = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    // Solo permitir método POST
    if (req.method !== "POST") {
      return res.status(405).json({
        success: false,
        message: "Método no permitido",
      });
    }

    const { name, email, message } = req.body;

    // Validaciones
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son requeridos",
      });
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Email no válido",
      });
    }

    const mailOptions = {
      from: `"Portfolio Web" <marcosstevens.web@gmail.com>`,
      to: "marcosstevens.web@gmail.com",
      replyTo: email,
      subject: `Nuevo mensaje desde Portfolio - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Nuevo mensaje desde tu Portfolio</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
                    Nuevo mensaje desde tu Portfolio
                </h2>
                
                <div style="margin: 20px 0;">
                    <p><strong>Nombre:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                </div>
                
                <div style="margin: 20px 0;">
                    <h3 style="color: #34495e;">Mensaje:</h3>
                    <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #3498db; border-radius: 5px;">
                        ${message.replace(/\n/g, "<br>")}
                    </div>
                </div>
                
                <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
                
                <p style="color: #7f8c8d; font-size: 12px;">
                    Este mensaje fue enviado desde tu portfolio web el ${new Date().toLocaleString("es-ES")}
                </p>
            </div>
        </body>
        </html>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({
          success: false,
          message: "Error al enviar el mensaje. Por favor, intenta nuevamente.",
        });
      }

      console.log("Email sent:", info.response);
      res.status(200).json({
        success: true,
        message: `¡Gracias por tu mensaje, ${name}! Te responderé pronto.`,
      });
    });
  });
});
