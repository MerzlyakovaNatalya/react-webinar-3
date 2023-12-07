import {memo, useCallback, useEffect, useContext} from 'react';
import {I18nContext} from "../../context/i18ncontext";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Menu from "../../components/menu";
import SideLayout from "../../components/side-layout";
import Pagination from "../../components/pagination";
import Spinner from "../../components/spinner";
import LanguageSwitch from "../../app/language-switch";
import {menu} from "../../utils";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Main() {

  const store = useStore();
  const {t} = useContext(I18nContext)

  useEffect(() => {
    store.actions.catalog.load({page:1});
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    page: state.catalog.params.page,
    limit: state.catalog.params.limit,
    count: state.catalog.count,
    loading: state.catalog.loading
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Пагинация
    onPaginate: useCallback(page => store.actions.catalog.load({page}), [store])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item 
        item={item} 
        onAdd={callbacks.addToBasket} 
        link={`/products/${item._id}`}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title={t('title')}>
        <LanguageSwitch/>
      </Head> 
      <SideLayout side='between'>
        <Menu items={menu} menuMain={t('main')}/>
        <BasketTool 
          onOpen={callbacks.openModalBasket} 
          amount={select.amount}
          sum={select.sum} 
          basketProducts={t('basket_products', select.amount)}
          inBasket={t('inBasket')}
          basket_open={t('basket_open')}/>
      </SideLayout> 
      <Spinner active={select.loading}>           
        <List list={select.list} renderItem={renders.item}/>
        <Pagination 
          page={select.page} 
          count={select.count} 
          limit={select.limit} 
          indent={1} 
          onChange={callbacks.onPaginate}/>
      </Spinner>
    </PageLayout>

  );
}

export default memo(Main);
