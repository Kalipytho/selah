import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export const sendMessageNotification = async ({
  name,
  email,
  message,
}) => {
  const mailOptions = {
    from: `"Selah Coffee Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,

    replyTo: email,

    subject: `New message from ${name} - Selah Coffee`,

    text: `
You received a new message through the Selah Coffee website.

Name: ${name}
Email: ${email}

Message:
${message}

--------------------------------
Selah Coffee Website
    `,

    html: `
      <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto; color: #2c211b;">

        <div style="background: #2c211b; padding: 25px; text-align: center;">
          <h1 style="color: #f5efe6; margin: 0;">
            Selah Coffee
          </h1>

          <p style="color: #d8cfc4; margin: 8px 0 0;">
            New Website Message
          </p>
        </div>

        <div style="background: #f5efe6; padding: 30px;">

          <h2 style="margin-top: 0;">
            You received a new message
          </h2>

          <div style="background: white; padding: 20px; border-radius: 12px;">

            <p>
              <strong>Name:</strong><br>
              ${name}
            </p>

            <p>
              <strong>Email:</strong><br>
              <a href="mailto:${email}" style="color: #a65d3b;">
                ${email}
              </a>
            </p>

            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">

            <p>
              <strong>Message:</strong>
            </p>

            <p style="white-space: pre-wrap; line-height: 1.7;">
              ${message}
            </p>

          </div>

          <p style="margin-top: 25px; color: #2c211b99; font-size: 13px;">
            This message was submitted through the Selah Coffee website.
          </p>

        </div>

      </div>
    `,
  }

  return transporter.sendMail(mailOptions)
}