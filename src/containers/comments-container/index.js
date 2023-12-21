import {memo, useState, useCallback} from "react";
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import {useNavigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import shallowequal from "shallowequal";
import commentsActions from '../../store-redux/comments/actions';
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";
import CommentLayout from "../../components/comment-layout";
import CommentList from "../../components/comment-list";
import CommentForm from "../../components/comment-form";


function CommentsContainer() {
  const [activeCommentId, setActiveCommentId] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {t} = useTranslate();

  const selectStore = useSelector(state => ({
    userId: state.session.user._id,
  }));

  const selectRedux = useSelectorRedux(state => ({
    article: state.article.data,
    articleId: state.article.data._id,
    articleWaiting: state.article.waiting,
    comments: state.comments.comments,
    commentsCount: state.comments.count,
    commentsWaiting: state.comments.waiting,
  }), shallowequal); 

  const callbacks = {
    onSendComment: useCallback((message) => {
      const type = activeCommentId ? 'comment' : 'article';
      const data = {text: message, parent: {_id: activeCommentId || selectRedux.articleId, _type: type}};
      dispatch(commentsActions.send(data));
    }, [activeCommentId]),
    onAnswerClick: useCallback((id) => {
      setActiveCommentId(id);
    }, []),
    onCancelClick: useCallback(() => {
      setActiveCommentId('');
    }, []),
    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),
  }

  const tree = listToTree(selectRedux.comments, selectRedux.articleId);
  const newComments = treeToList(tree, (item, level) => ({...item, level}));

  return (
    <CommentLayout count={selectRedux.commentsCount} t={t}>
      <CommentList
        comments={newComments}
        activeCommentId={activeCommentId} 
        onSendComment={callbacks.onSendComment}
        userId={selectStore.userId}
        onAnswerClick={callbacks.onAnswerClick}
        onCancelClick={callbacks.onCancelClick}
        onSignIn={callbacks.onSignIn}
        t={t}
      />
      {
        !activeCommentId &&
        <CommentForm
          userId={selectStore.userId}
          onSignIn={callbacks.onSignIn}
          onSendComment={callbacks.onSendComment}
          t={t}
        />
      }
    </CommentLayout>
  )
}

export default memo(CommentsContainer);