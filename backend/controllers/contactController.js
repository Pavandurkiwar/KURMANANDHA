const Message = require('../models/Message');
const nodemailer = require('nodemailer');

// @desc    Submit a contact form message
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
  const { name, phone, email, message } = req.body;

  // Validation
  if (!name || !phone || !message) {
    res.status(400);
    throw new Error('Please fill in all required fields (Name, Phone, Message)');
  }

  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phone.replace(/[\s-]/g, ''))) {
    res.status(400);
    throw new Error('Please enter a valid 10-digit phone number');
  }

  if (email && email.trim() !== '') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400);
      throw new Error('Please enter a valid email address');
    }
  }

  // Save message to MongoDB database
  const savedMessage = await Message.create({
    name,
    phone,
    email: email || undefined,
    message,
  });

  // Try to send email notification
  let emailSent = false;
  try {
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"${name}" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_EMAIL_RECEIVER || process.env.SMTP_USER,
        replyTo: email || undefined,
        subject: `New Contact Message from ${name}`,
        text: `
You have received a new message from the website contact form:

Name: ${name}
Phone: ${phone}
Email: ${email || 'Not provided'}
Message:
${message}
        `,
        html: `
<h3>New Contact Form Submission</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Phone:</strong> ${phone}</p>
<p><strong>Email:</strong> ${email || 'Not provided'}</p>
<p><strong>Message:</strong></p>
<p style="white-space: pre-line;">${message}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      emailSent = true;
      console.log('Contact form email notification sent successfully.');
    } else {
      console.log('SMTP settings not fully configured in .env. Skipping email notification.');
    }
  } catch (err) {
    console.error('Error sending email notification:', err.message);
    // Do not fail the API response if email fails, database save was successful
  }

  res.status(201).json({
    success: true,
    message: 'Message received successfully!',
    emailSent,
    data: savedMessage,
  });
};

module.exports = {
  submitContact,
};
