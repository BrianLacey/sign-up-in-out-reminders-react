import React, { PureComponent, Fragment } from "react";
import { Modal } from "react-bootstrap";
import moment from "moment";
import { createReminder } from "../services/reminderServices.js";
import { createReminderValidationHelper } from "../helpers/validationHelper.js";

class CreateReminderModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      date: "",
      smsNotifications: false,
      emailNotifications: false,
      validContent: true,
      validDate: true
    };
  }

  handleChange = e => {
    if (e.target.name === "date") {
      const formattedDate = moment(e.target.value).toISOString();
      this.setState({ [e.target.name]: formattedDate });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  handleChecked = e => this.setState({ [e.target.name]: e.target.checked });

  handleSubmitReminder = () => {
    const { content, date, smsNotifications, emailNotifications } = this.state;
    const formData = { content, date };
    const validInputs = createReminderValidationHelper(formData);
    this.setState(prevState => {
      const updatedState = { ...prevState, ...validInputs };
      return updatedState;
    });
    const validInputValues = Object.values(validInputs);
    if (validInputValues.includes(false)) {
      return;
    }
    const data = Object.assign(
      { ...formData },
      { smsNotifications, emailNotifications }
    );
    createReminder(data)
      .then(response => {
        alert(response);
        this.setState({
          content: "",
          date: "",
          smsNotifications: false,
          emailNotifications: false,
          validContent: true,
          validDate: true
        });
      })
      .catch(err => alert(err));
  };

  render() {
    const { showReminderModal, handleToggleModal } = this.props;
    const {
      content,
      date,
      smsNotifications,
      emailNotifications,
      validDate,
      validContent
    } = this.state;
    return (
      <Modal show={showReminderModal} size="sm" centered>
        <Modal.Body>
          <div className="App">
            <p>On:</p>
            <input
              name="date"
              type="datetime-local"
              value={
                moment(date)
                  .format()
                  .substring(0, 16) || ""
              }
              onChange={this.handleChange}
            />
            {!validDate && (
              <span className="App-error-tags">Please enter a date.</span>
            )}
            <br />
            <br />
            <p>Remind me to:</p>
            <textarea
              name="content"
              value={content}
              onChange={this.handleChange}
            />
            <br />
            {!validContent && (
              <span className="App-error-tags">Please enter reminder.</span>
            )}
            <br />
            <br />
            <p>Remind me via:</p>
            <label>
              <input
                name="smsNotifications"
                type="checkbox"
                checked={smsNotifications}
                onChange={this.handleChecked}
              />
              Sms
            </label>
            &nbsp;&nbsp;
            <label>
              <input
                name="emailNotifications"
                type="checkbox"
                checked={emailNotifications}
                onChange={this.handleChecked}
              />
              Email
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" onClick={this.handleSubmitReminder}>
            <p>Save</p>
          </button>
          <button type="button" onClick={handleToggleModal}>
            <p>Close</p>
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CreateReminderModal;
