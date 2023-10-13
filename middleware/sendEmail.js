const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (reciever, source, content) => {
  try {
    const msg = {
      to: reciever, // Change to your recipient
      from: source, // Change to your verified sender
      subject: "Reset Password",
      html: content,
    };
    return sgMail.send(msg);
  } catch (e) {
    return new Error(e);
  }
};

function sendEmailWithAttachment(email, pdfBuffer) {
  const msg = {
    to: email,
    from: "wal@k2x.tech",
    subject: "PDF File Attached",
    text: "Please find the attached PDF file.",
    attachments: [
      {
        content: pdfBuffer.toString("base64"),
        filename: "file.pdf",
        type: "application/pdf",
        disposition: "attachment",
      },
    ],
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = { sendEmail, sendEmailWithAttachment };
