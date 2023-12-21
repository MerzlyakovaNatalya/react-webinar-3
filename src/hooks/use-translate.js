import {useCallback, useContext} from 'react';
import {I18nContext} from '../i18n/context';
import {useState, useMemo, useLayoutEffect} from "react";
import useServices from "./use-services";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const i18n = useServices().i18n;

  const [lang, setLang] = useState(i18n.getLang());
  const t = i18n.translate.bind(i18n);

  const changeLang = (value) => {
    setLang(value);
    i18n.setLang(value);
  };

  const unsubscribe = useMemo(() => {
    return i18n.subscribe((value) => {
      setLang(value);
    });
  }, []); 

  useLayoutEffect(() => unsubscribe, [unsubscribe]);

  return {lang, changeLang, t};
  // return useContext(I18nContext);
}
