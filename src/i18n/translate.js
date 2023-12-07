import * as locales from './locales';

export default function translate(lang, text, plural) {
  let result = locales[lang] && (text in locales[lang])
    ? locales[lang][text]
    : text;

  if (typeof plural !== 'undefined'){
    const key = new Intl.PluralRules(lang).select(plural);
    if (key in result) {
      result = result[key];
    }
  }

  return result;
}