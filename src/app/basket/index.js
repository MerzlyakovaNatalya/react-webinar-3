import {memo, useCallback, useContext} from 'react';
import {I18nContext} from "../../context/i18ncontext";
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Basket() {

  const store = useStore();
  const {t} = useContext(I18nContext)

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket 
                item={item} 
                onRemove={callbacks.removeFromBasket} 
                link={`/products/${item._id}`}
                onLink={callbacks.closeModal}
             />
    }, [callbacks.removeFromBasket]),
  };

  return (
    <ModalLayout title={t('basket_title')} onClose={callbacks.closeModal} basket_close={t('basket_close')}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} basket_total={t('basket_total')}/>
    </ModalLayout>
  );
}

export default memo(Basket);
