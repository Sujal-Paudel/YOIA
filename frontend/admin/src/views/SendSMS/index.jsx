import React from "react";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import fetchy from "../../utils/fetchy";

function SendSMS() {
  const { clientsData } = useSelector((state) => state);

  const data = Object.values(clientsData)
    .filter((data) => data.sendSMS && data.phone)
    .slice(0, 101);

  const phoneNumberArray = data.map((d) => d.phone);

  const [sms, setSMS] = React.useState("");
  const [error, setError] = React.useState(false);

  const handleClick = () => {
    fetchy(`/api/v1/admin/sendSMS`, "PUT", { phoneNumberArray, text: sms }).then(
      ({ error, success }) => {
        if (error === "SMS_LIMIT_TODAY") {
          alert("SMS limit reached for today.");
          setSMS("");
        }
        if (success) {
          alert("SMS sent successfully");
          setSMS("");
        }
      }
    );
  };

  return (
    <div>
      <h3>Send SMS</h3>
      <p style={{ fontWeight: "bold" }}>Number of people Selected: {data.length}</p>
      <p>{data.map((d) => `${d.fullName}(${d.username}), `)}</p>

      <div style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}>
        <textarea
          autoFocus
          style={{ fontSize: "18px" }}
          value={sms}
          onChange={(e) => {
            if (sms.length > 160) {
              setError(true);
            } else {
              setSMS(e.currentTarget.value);
            }
          }}
          rows={10}
          cols={30}
        />
        {error && <p style={{ color: "red" }}>160 characters exceeded</p>}
        <Button variant="contained" color="primary" onClick={handleClick}>
          Send SMS
        </Button>
      </div>
    </div>
  );
}

export default SendSMS;
