import PropTypes from "prop-types";
//helpers
import { sanitizeHtml } from "../../helpers/SafeHtml.helper";
const MessageComponent = ({ messages }) => {
  return (
    <div className="content-section">
      <div className="dashboard-header">
        <h1># General</h1>
      </div>
      <div className="dashboard-body-content">
        <div className="dashboard-body">
          <div className="dashboard-body__message--user">
            <div className="dashboard-body__message--avatar">
              <img
                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                alt=""
              />
            </div>
            <div className="dashboard-body__message--name">
              <span>John Doe</span>
            </div>
          </div>
          <div className="dashboard-body__message--content">
            {messages.map((msg) => {
              console.log("ems", msg);
              return (
                <div key={msg?.id}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(msg?.data),
                    }}
                  />
                </div>
              );
            })}
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
              voluptatem.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
              voluptatem.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;

MessageComponent.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      data: PropTypes.string.isRequired,
    })
  ).isRequired,
};
