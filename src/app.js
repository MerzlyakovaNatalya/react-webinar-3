import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Total from "./components/total";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import ModalLayout from "./components/modal-layout";
import Item from "./components/item"
import ItemBasket from "./components/item-basket";
import BasketTotal from "./components/basketTotal"

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [modal, setModal] = useState(null)

  const state = store.getState();

  const callbacks = {
    addToBasket: useCallback((code) => {
      store.addToBasket(code)
    }, [store]),

    removeFromBasket: useCallback((code) => {
      store.removeFromBasket(code)
    }, [store]),

    onCloseModal: useCallback(() => {
      setModal(null)
    }, []),

    onOpenModal: useCallback(() => {
       setModal('basket')
    }, [])
  }

  const itemCallbacks = {
    itemList: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}></Item>
    }, [callbacks.addToBasket]),

    itemBasket: useCallback((item) => {
      return <ItemBasket item={item} onRemove={callbacks.removeFromBasket}></ItemBasket>
    }, [callbacks.removeFromBasket])
  }
  return (
    <>
    <PageLayout>
      <Head title='Приложение на чистом JS'/>
      <Total onOpen={callbacks.onOpenModal} sum={state.basket.sum} amount={state.basket.amount}/>
      <List list={state.list} render={itemCallbacks.itemList}/>
    </PageLayout>
    {modal === 'basket' && (
      <ModalLayout onClose={callbacks.onCloseModal}>
        <List list={state.basket.list} render={itemCallbacks.itemBasket}></List>
        <BasketTotal sum={state.basket.sum}></BasketTotal>
      </ModalLayout>
    )}
    </>
  );
}

export default App;
