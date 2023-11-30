import React, {useState} from "react";
import PropTypes from "prop-types";
import { format } from "../../utils";
import './style.css';

function Item(props) {

  const callbacks = {
    onAdd: () => props.onAdd(props.item.code)
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-actions'>
        <div className='Item-price'>{format(props.item.price)} ₽</div>
          <button onClick={callbacks.onAdd}>
            Добавить
          </button>  
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func
};

Item.defaultProps = {
  onAdd: () => {
  }
}

export default React.memo(Item);
