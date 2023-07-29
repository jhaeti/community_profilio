const sgMail = require("@sendgrid/mail");

const sendEmail = ({ to, from, subject, text, html }) => {
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);

	const msg = {
		to: "", // Change to your recipient
		from: "jhaeti@gmail.com", // Change to your verified sender
		subject: "Sending with SendGrid is Fun",
		text: "",
		html: "",
	};
	if (to) {
		msg.to = to;
	}
	if (from) msg.from = from;
	if (subject) msg.subject = subject;
	if (text) msg.text = text;
	if (html) msg.html = html;

	sgMail
		.send(msg)
		.then(() => console.log("Message sent to " + to))
		.catch((error) => {
			console.error(error);
		});
};

module.exports = sendEmail;
