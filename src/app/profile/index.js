import {memo} from 'react';
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
  const store = useStore()

  const select = useSelector(state => ({
    profile: state.profile.data,
    waiting: state.profile.waiting
  }));

  useInit(() => {
    store.actions.profile.load();
  }, []);

  return (
    <PageLayout>
      <TopMenu/>
      <Head title='Магазин'>
        <LocaleSelect/>
      </Head>
      <Navigation/>
        <ProfileCard user={select.profile}/>
    </PageLayout>
  );
}

export default memo(Profile);