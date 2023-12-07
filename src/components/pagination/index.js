import {memo} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Pagination(props) {

  const cn = bem('Pagination');

  let items = [];

  const quantityPages = Math.ceil(props.count / Math.max(props.limit, 1));

  let left = Math.max(props.page - props.indent, 1);
  let right = Math.min(left + props.indent * 2, quantityPages);
  left = Math.max(right - props.indent * 2, 1);

  if (left > 1) items.push(1);
  if (left > 2) items.push(null);
  for (let page = left; page <= right; page++) items.push(page);
  if (right < quantityPages - 1) items.push(null);
  if (right < quantityPages) items.push(quantityPages);

  return (
    <ul className={cn()}>
     {items.map((number, index) => (
        <li key={index}
            className={cn('item', {active: number === props.page, split: !number})}
            onClick={() => props.onChange(number)} 
        >
           {number || '...'}
        </li>
     ))}
    </ul>
  );
}

Pagination.propTypes = {
  page: PropTypes.number,
  count: PropTypes.number,
  limit: PropTypes.number,
  indent: PropTypes.number,
  onChange: PropTypes.func,
}

Pagination.defaultTypes = {
  page: 1,
  count: 1000,
  limit: 10,
  indent: 1,
  onChange: () => {},
}

export default memo(Pagination);