import axios from "axios";
import classNames from "classnames";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Checkbox, Form } from "semantic-ui-react";
import { BASE_URL } from "./data-url";

const Create = () => {
  let history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  const postData = () => {
    axios
      .post(BASE_URL, {
        firstName,
        lastName,
        "Terms & Conditions Agree?": checkbox,
      })
      .then(() => {
        setIsCreated((prevState) => !prevState);
        setTimeout(() => {
          setIsCreated((prevState) => !prevState);
          history.push("/read");
        }, 1500);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="create-route">
      <div
        className={classNames(
          "ui message",
          { positive: isCreated },
          { noshow: !isCreated }
        )}
      >
        <div className="header">Success!!</div>
        <p>User has been created.</p>
      </div>
      <Form className="create-form">
        <Form.Field>
          <label>First Name</label>
          <input
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            label="I agree to the Terms and Conditions"
            onChange={(e, d) => setCheckbox(d.checked)}
          />{" "}
          {/* https://stackoverflow.com/questions/55823965/event-target-value-returns-undefined-with-semantic-ui-when-i-console-log-it */}
        </Form.Field>
        <Button type="submit" onClick={postData}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Create;
