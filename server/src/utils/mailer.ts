import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "wojciechrut1998@gmail.com",
    pass: "mhoqulxzozodusgt",
  },
  secure: true,
});

export const sendNewMessageEmail = (
  senderNickname: string,
  receiverEmail: string,
  senderId: string
) => {
  const mailData = {
    from: "etutoringtool@gmail.com",
    to: receiverEmail,
    subject: "eTutoringTool - new message!",
    html: `You have new message from ${senderNickname}.<br>
<p><a href="http://localhost:3000/chats?user=${senderId}">Click here</a> to see chat.</p>
`,
  };
  transport.sendMail(mailData);
};

export const sendNewMeetingEmail = (
  organiserNickname: string,
  invitedEmails: Array<string>
) => {
  const mailData = {
    from: "etutoringtool@gmail.com",
    to: invitedEmails,
    subject: "eTutoringTool - new meeting!",
    html: `Hey! ${organiserNickname} has invited you to a meeting.<br>
<p><a href="http://localhost:3000/meetings">Click here</a> to see your meetings.</p>
`,
  };
  console.log(invitedEmails);
  if (invitedEmails) {
    transport.sendMail(mailData);
  }
};
