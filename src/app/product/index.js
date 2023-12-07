import {memo, useCallback, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {menu} from "../../utils";
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
      <Head title={select.product.title}/>
      <SideLayout side='between'>
        <Menu items={menu}/>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      </SideLayout>
      <Spinner active={select.loading}>
        <ProductCard product={select.product} onAdd={callbacks.addToBasket}/>
      </Spinner>
    </PageLayout>

  );
}

export default memo(Product);
