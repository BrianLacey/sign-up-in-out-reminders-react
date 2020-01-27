import React, { PureComponent, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { signOutUser } from "./services/userServices.js";
import CreateReminderModal from "./reminders/createReminderModal.js";

class HomePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      signedOut: false,
      showReminderModal: true
    };
  }

  handleSignOut = () => {
    signOutUser();
    alert("You have signed out.");
    this.setState({ signedOut: true });
  };

  handleShowReminderModal = () => {
    const { showReminderModal } = this.state;
    this.setState({ showReminderModal: !showReminderModal });
  };

  render() {
    const { signedOut, showReminderModal } = this.state;
    return (
      <Fragment>
        {signedOut && <Redirect to="/" />}
        <CreateReminderModal
          showReminderModal={showReminderModal}
          handleToggleModal={this.handleShowReminderModal}
        />
        <div className="App">
          <header className="App-header">
            <h1 className="App-header-tags">Welcome!</h1>
            <button type="button" onClick={this.handleShowReminderModal}>
              Create reminder
            </button>
            <br />
            <br />
            <button type="button" onClick={this.handleSignOut}>
              Sign Out
            </button>
          </header>
        </div>
      </Fragment>
    );
  }
}

export default HomePage;
