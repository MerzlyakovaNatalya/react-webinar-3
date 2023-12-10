import {memo, useCallback, useEffect, useContext} from 'react';
import {I18nContext} from "../../context/i18ncontext";
import {useParams} from "react-router-dom";
import {menu} from "../../utils";
import LanguageSwitch from "../../app/language-switch"
import Menu from "../../components/menu";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import ProductCard from "../../components/product-card";
import SideLayout from "../../components/side-layout";
import Spinner from "../../components/spinner";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Product() {

  const store = useStore();
  const params = useParams()
  const {t} = useContext(I18nContext)

  useEffect(() => {
    store.actions.product.load(params.id);
  }, [params.id]);

  const select = useSelector(state => ({
    product: state.product.data,
    amount: state.basket.amount,
    sum: state.basket.sum,
    loading: state.product.loading
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

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
        <ProductCard 
          product={select.product} 
          onAdd={callbacks.addToBasket}
          product_add={t('product_add')}/>
      </Spinner>
    </PageLayout>

  );
}

export default memo(Product);
