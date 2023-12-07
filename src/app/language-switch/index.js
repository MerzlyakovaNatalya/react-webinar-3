import { memo, useMemo, useContext } from "react";
import Select from "../../components/select";
import {I18nContext} from "../../context/i18ncontext";

function LanguageSwitch() {
  const { lang, setLang } = useContext(I18nContext)

  const options = {
    lang: useMemo(
      () => [
        { value: "ru", title: "Русский" },
        { value: "en", title: "English" },
      ],
      []
    ),
  };

  return <Select onChange={setLang} value={lang} options={options.lang} />;
}

export default memo(LanguageSwitch);
