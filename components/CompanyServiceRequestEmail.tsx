import React from "react";

export interface CompanyServiceRequestEmailProps {
  name: string;
  email: string;
  phone: string;
  serviceName: string;
  message: string;
}


export const CompanyServiceRequestEmail: React.FC<CompanyServiceRequestEmailProps> = ({
  name,
  email,
  phone,
  serviceName,
  message,
}) => {
  return (
    <div
      style={{
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        fontSize: "16px",
        color: "#333",
        lineHeight: "1.5",
        padding: "20px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#fff",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <header
          style={{
            backgroundColor: "#0070f3",
            color: "#fff",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "24px" }}>New Service Request</h1>
        </header>

        <main style={{ padding: "20px" }}>
          <p>
            You have received a new service request for <strong>{serviceName}</strong>.
          </p>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <tbody>
              <tr>
                <td style={{ fontWeight: "bold", padding: "8px 0" }}>Name:</td>
                <td style={{ padding: "8px 0" }}>{name}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", padding: "8px 0" }}>Email:</td>
                <td style={{ padding: "8px 0" }}>{email}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", padding: "8px 0" }}>Phone:</td>
                <td style={{ padding: "8px 0" }}>{phone}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", padding: "8px 0" }}>Message:</td>
                <td style={{ padding: "8px 0" }}>{message}</td>
              </tr>
            </tbody>
          </table>

          {/* <p style={{ marginTop: "20px" }}>
            Please follow up with the client as soon as possible.
          </p> */}
        </main>

        <footer
          style={{
            backgroundColor: "#f1f1f1",
            padding: "15px",
            textAlign: "center",
            fontSize: "12px",
            color: "#555",
          }}
        >
          &copy; {new Date().getFullYear()} Hassan Adan. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

