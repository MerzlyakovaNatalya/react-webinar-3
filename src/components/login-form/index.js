import {memo, useRef} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function LoginForm({children, onSubmit, dataForm}) {
  const cn = bem('LoginForm');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Вход</h2>
      <form className={cn('form')} onSubmit={(e) => onSubmit(e, dataForm)}>
        {children}
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func, 
  children: PropTypes.node,
};

LoginForm.defaultProps = {
  onSubmit: () => {}
}

export default memo(LoginForm);