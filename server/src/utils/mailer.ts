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
  console.log(mailData);
  transport.sendMail(mailData);
};
