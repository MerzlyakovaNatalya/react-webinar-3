import {memo} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Menu({items, menuMain}) {
  const cn = bem('Menu')
  return (
    <ul className={cn()}>
      {items.map(item => (
        <li key={item.key} className={cn('item')}>
            <Link className={cn('link')} to={item.link}>{menuMain}</Link>
        </li>
      ))}
    </ul>
  )
}

Menu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number,
    link: PropTypes.string,
    title: PropTypes.string,
    menuMain: PropTypes.node
  })),
};

export default memo(Menu);