import axios from "axios";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Checkbox, Form } from "semantic-ui-react";
import { BASE_URL } from "./data-url";

const Update = () => {
  let history = useHistory();
  const [id, setId] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  useEffect(() => {
    setId(localStorage.getItem("ID"));
    setFirstName(localStorage.getItem("First Name"));
    setLastName(localStorage.getItem("Last Name"));
    setCheckbox(Boolean(localStorage.getItem("Terms & Conditions Agree?")));
  }, []);

  const pushToHistory = () => {
    setTimeout(() => {
      history.push("/read");
    }, 1500);
  };
  const updateUser = () => {
    axios
      .put(`${BASE_URL}${id}`, {
        firstName,
        lastName,
        checkbox,
      })
      .then(() => {
        setIsUpdated(true);
        pushToHistory();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="update-route">
      <div
        className={classNames(
          "ui message",
          { positive: isUpdated },
          { noshow: !isUpdated }
        )}
      >
        <div className="header">Success!!</div>
        <p>User has been updated.</p>
      </div>
      <Form className="update-form">
        <Form.Field>
          <label>First Name</label>
          <input
            value={firstName}
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            checked={checkbox}
            label="I agree to the Terms and Conditions"
            onChange={(e, d) => setCheckbox(d.checked)}
          />{" "}
          {/* https://stackoverflow.com/questions/55823965/event-target-value-returns-undefined-with-semantic-ui-when-i-console-log-it */}
        </Form.Field>
        <Button type="submit" onClick={updateUser}>
          Update
        </Button>
      </Form>
    </div>
  );
};

export default Update;
