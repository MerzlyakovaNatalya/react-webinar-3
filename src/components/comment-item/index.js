import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { formatDate } from "../../utils/date-format";
import CommentForm from "../comment-form";
import "./style.css";

function CommentItem({
  comment,
  activeCommentId,
  userId,
  onAnswerClick,
  onCancelClick,
  onSendComment,
  onSignIn,
  t,
}) {
  const cn = bem("CommentItem");

  return (
    <li
      className={cn()}
      style={{
        marginLeft: `${(comment.level <= 6 ? comment.level : 6) * 30}px`,
      }}
    >
      <div className={cn("wrap-user")}>
        <span className={cn("user", { self: userId === comment.author._id })}>
          {comment.author.profile.name}
        </span>
        <span className={cn("data")}>{formatDate(comment.dateCreate)}</span>
      </div>
      <p className={cn("text")}>{comment.text}</p>
      <button className={cn("answer")} onClick={() => onAnswerClick(comment._id)}>
        {t("comments.answerComment")}
      </button>
      {activeCommentId === comment._id && (
        <CommentForm
          userId={userId}
          activeCommentId={activeCommentId}
          activeCommentAuthor={comment.author.profile.name}
          onCancelClick={onCancelClick}
          onSendComment={onSendComment}
          onSignIn={onSignIn}
          t={t}
        />
      )}
    </li>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.object,
  activeCommentId: PropTypes.string,
  userId: PropTypes.string,
  onHandleAnswer: PropTypes.func,
  onCancelClick: PropTypes.func,
  onSendComment: PropTypes.func,
  onSignIn: PropTypes.func,
  t: PropTypes.func,
};

CommentItem.defaultProps = {
  comment: {},
  activeCommentId: "",
  onHandleAnswer: () => {},
  onCancelClick: () => {},
  onSendComment: () => {},
  onSignIn: () => {},
  t: (text) => text,
};

export default memo(CommentItem);
