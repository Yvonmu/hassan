/* eslint-disable @typescript-eslint/no-explicit-any */
// app/actions/sendContactFormAction.ts
"use server"
import { Resend } from "resend";
import { CompanyServiceRequestEmail } from "@/components/CompanyServiceRequestEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  fullName: string;
  emailAddress: string;
  phoneNumber?: string;
  subject: string;
  message: string;
  citizenship?: string;
  appointmentDate?: string;
}

export async function sendContactFormAction(formData: ContactFormData) {
  const {
    fullName,
    emailAddress,
    phoneNumber,
    subject,
    message,
    citizenship,
    appointmentDate,
  } = formData;

  if (!fullName || !emailAddress || !subject || !message) {
    throw new Error("Please fill all required fields.");
  }

  const adminEmail = process.env.CONTACT_EMAIL ?? "";
  if (!adminEmail) throw new Error("Admin email not configured.");

  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL ?? "",
      to: [adminEmail],
      subject: `Contact Form: ${subject}`,
      react: (
        <CompanyServiceRequestEmail
          name={fullName}
          email={emailAddress}
          phone={phoneNumber ?? ""}
          serviceName={subject}
          message={`${message}${citizenship ? `\nCitizenship: ${citizenship}` : ""}${appointmentDate ? `\nAppointment: ${appointmentDate}` : ""}`}
        />
      ),
    });
  } catch (err: any) {
    console.error("Failed to send contact email:", err);
    throw new Error("Failed to send email. Please try again later.");
  }
}
