import {memo, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useInit from '../../hooks/use-init';
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import ProfileCard from "../../components/profile-card";
import TopMenu from '../../containers/top-menu';

function Profile() {
  const store = useStore();

  useInit(() => {
    store.actions.login.checkAuth()
  }, []);

  const select = useSelector(state => ({
    user: state.login.user,
    status: state.login.status,
  }));

  return (
    <PageLayout>
      <TopMenu/>
      <Head title='Магазин'>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <ProfileCard user={select.user}/>
    </PageLayout>
  );
}

export default memo(Profile);