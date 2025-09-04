"use server";

import React from "react";
import { Resend } from "resend";
import { CompanyServiceRequestEmail } from "@/components/CompanyServiceRequestEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ServiceRequestData {
  name: string;
  email: string;
  phone: string;
  message: string;
  serviceName: string;
}

export async function sendServiceRequestAction(data: ServiceRequestData) {
  const { name, email, phone, message, serviceName } = data;

  if (!name || !email || !phone || !message || !serviceName) {
    throw new Error("All fields are required");
  }

  const primaryItAdminEmail = process.env.CONTACT_EMAIL ?? "";

  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL ?? "",
      to: [primaryItAdminEmail],
      subject: `Service Request: ${serviceName}`,
      react: (
        <CompanyServiceRequestEmail
          name={name}
          email={email}
          phone={phone}
          serviceName={serviceName}
          message={message}
        />
      ),
    });

    return { message: "Service request sent successfully" };
  } catch (err) {
    console.error(err);
    throw new Error("Failed to send service request");
  }
}
