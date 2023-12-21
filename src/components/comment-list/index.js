import {React, memo} from 'react';
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import CommentItem from '../comment-item';
import './style.css';

function CommentList({ 
  comments, 
  activeCommentId, 
  userId, 
  onAnswerClick, 
  onCancelClick, 
  onSendComment, 
  onSignIn, 
  t }) {
  const cn = bem('CommentList');

  return (
    <ul className={cn()}>
      {comments.map((item) => {
        return (
          <CommentItem
            comment={item}
            activeCommentId={activeCommentId}
            key={item._id}
            userId={userId}
            onSignIn={onSignIn}
            onAnswerClick={onAnswerClick}
            onCancelClick={onCancelClick}
            onSendComment={onSendComment}
            t={t}
          />
        )
      })}
    </ul>
  );
}

CommentList.PropTypes = {
  comments: PropTypes.array,
  activeCommentId: PropTypes.string,
  userId: PropTypes.string,
  onHandleAnswer: PropTypes.func,
  onCancelClick: PropTypes.func,
  onSendComment: PropTypes.func,
  onSignIn: PropTypes.func,
  t: PropTypes.func
}

CommentList.defaultProps = {
  comments: [],
  activeCommentId: '',
  onHandleAnswer: () => {},
  onCancelClick: () => {},
  onSendComment: () => {},
  onSignIn: () => {},
  t: (text) => text
}

export default memo(CommentList);