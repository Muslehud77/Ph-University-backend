import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (email: string,link:string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.node_env === "production", // Use `true` for port 465, `false` for all other ports
    auth: {
      user: config.NODE_MAILER_EMAIL,
      pass: config.NODE_MAILER_PASSWORD,
    },
  });

 const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password with in 10min</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        padding: 20px;
        background-color: #4CAF50;
        color: white;
      }
      .content {
        padding: 20px;
        text-align: center;
      }
      .content p {
        font-size: 16px;
        color: #333333;
      }
      .reset-button {
        display: inline-block;
        padding: 10px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: white !important;
        background-color: #4CAF50;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        text-align: center;
        padding: 20px;
        font-size: 14px;
        color: #777777;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Password Reset</h1>
      </div>
      <div class="content">
        <p>Hello,</p>
        <p>You requested to reset your password. Please click the button below to reset it:</p>
        <a href="${link}" class="reset-button">Reset Your Password</a>
        <p>If you did not request a password reset, please ignore this email.</p>
      </div>
      <div class="footer">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;
  await transporter.sendMail({
    from: 'fardinmohit@gmail.com', // sender address
    to: email, // list of receivers
    subject: 'About Changing The Password', // Subject line
    text: 'Tmi mia password mone rakhte parona?', // plain text body
    html: htmlContent, // html body
  });
};
