"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNewMeetingEmail = exports.sendNewMessageEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transport = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: "wojciechrut1998@gmail.com",
        pass: "mhoqulxzozodusgt",
    },
    secure: true,
});
const sendNewMessageEmail = (senderNickname, receiverEmail, senderId) => {
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
exports.sendNewMessageEmail = sendNewMessageEmail;
const sendNewMeetingEmail = (organiserNickname, invitedEmails) => {
    const mailData = {
        from: "etutoringtool@gmail.com",
        to: invitedEmails,
        subject: "eTutoringTool - new meeting!",
        html: `Hey! ${organiserNickname} has invited you to a meeting.<br>
<p><a href="http://localhost:3000/meetings">Click here</a> to see your meetings.</p>
`,
    };
    if (invitedEmails) {
        transport.sendMail(mailData);
    }
};
exports.sendNewMeetingEmail = sendNewMeetingEmail;
