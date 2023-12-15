import {memo} from 'react';
import {useNavigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import useInit from '../../hooks/use-init';
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import ProfileCard from "../../components/profile-card";
import TopMenu from '../../containers/top-menu';

function Profile() {
  const navigate = useNavigate();

  const select = useSelector(state => ({
    user: state.login.user,
    status: state.login.status,
    token: state.login.token
  }));

  useInit(() => {
    if(!select.token) navigate(-1)
  }, [select.token]);

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