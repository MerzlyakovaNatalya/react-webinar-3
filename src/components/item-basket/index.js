import React, {memo} from 'react';
import PropTypes from "prop-types";
import {format} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import './style.css';

function ItemBasket(props) {

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item.code)
  };

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('inner')}>
        <div className={cn('text')}>{format(props.item.price)} ₽</div>
        <div className={cn('text')}>{format(props.item.amount || 0)} шт</div>
        <div className={cn('text')}><button onClick={callbacks.onRemove}>Удалить</button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
  }).isRequired,
  onRemove: PropTypes.func
}

ItemBasket.defaultProps = {
  onRemove: () => {}
}

export default memo(ItemBasket);