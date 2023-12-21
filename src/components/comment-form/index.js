import { useState, memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function CommentForm({
  userId,
  activeCommentId,
  onCancelClick,
  onSendComment,
  onSignIn,
  t,
}) {
  const cn = bem("CommentForm");
  const [message, setMessage] = useState("");

  const text = activeCommentId
    ? `${t("comments.answer")}.`
    : `${t("comments.сomment")}.`;

  const titleText = activeCommentId
    ? `${t("comments.newAnswer")}`
    : `${t("comments.newComment")}`;

  return (
    <>
      {!userId ? (
        <div
          className={cn("", {
            active: !!activeCommentId,
          })}
        >
          <a className={cn("link")} onClick={onSignIn}>
            {t("comments.login")}
          </a>{" "}
          {text}
          {activeCommentId && (
            <button
              className={cn("cancelLink")}
              type="button"
              onClick={onCancelClick}
            >
              {t("comments.cancel")}
            </button>
          )}
        </div>
      ) : (
        <form
          className={cn("", {
            active: !!activeCommentId,
          })}
          onSubmit={(evt) => {
            evt.preventDefault();
            setMessage("");
            onSendComment(message);
          }}
        >
          <fieldset className={cn("fieldset")}>
            <legend className={cn("legend")}>{titleText}</legend>
            <textarea
              className={cn("textarea")}
              rows="5"
              value={message}
              onChange={(evt) => setMessage(evt.target.value)}
              placeholder="Текст"
            ></textarea>
            <div className={cn("buttons")}>
              <button
                className={cn("submit")}
                type="submit"
                disabled={!message?.trim()}
              >
                {t("comments.send")}
              </button>
              {activeCommentId && (
                <button
                  type="button"
                  onClick={onCancelClick}
                >
                  {t("comments.cancel")}
                </button>
              )}
            </div>
          </fieldset>
        </form>
      )}
   </>
  );
}

CommentForm.propTypes = {
  userId: PropTypes.string,
  activeCommentId: PropTypes.string,
  onCancelClick: PropTypes.func,
  onSendComment: PropTypes.func,
  onSignIn: PropTypes.func,
  t: PropTypes.func,
};

CommentForm.defaultProps = {
  activeCommentId: "",
  onCancelClick: () => {},
  onSendComment: () => {},
  onSignIn: () => {},
  t: (text) => text,
};

export default memo(CommentForm);
