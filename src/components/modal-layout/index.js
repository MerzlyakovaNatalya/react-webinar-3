import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ModalLayout(props) {

  const cn = bem('ModalLayout');

  return (
    <div className={cn()}>
      <div className={cn('inner')}>
        <div className={cn('head')}>
          <h1 className={cn('title')}>{props.title}</h1>
          <button className={cn('button')} onClick={props.onClose}>Закрыть</button>
        </div>
        <div className={cn('content')}>
          {props.children}
        </div>
      </div>
    </div>
  );
}

ModalLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  onClose: PropTypes.func,
}

ModalLayout.defaultProps = {
  title: 'модальное окно',
  onClose: () => {},
}

export default React.memo(ModalLayout);