
const initialState = {
  comments: [],
  count: 0,
  newCommentId: '',
  waiting: false 
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, comments: [], newCommentId: '', waiting: true};

    case "comments/load-success":
      return { ...state, comments: action.payload.data.items, count: action.payload.data.count, waiting: false};

    case "comments/load-error":
      return { ...state, comments: [], count: 0, waiting: false}; 

    case "comments/send-start":
      return { ...state, waiting: true};

    case "comments/send-success":
      return { 
        ...state,
        comments: [...state.comments, action.payload],
        newCommentId: action.payload._id,
        count: state.count + 1,
        waiting: false
      };

    case "comments/send-error":
      return { ...state, waiting: false};

    default:
      return state;
  }
}

export default reducer;