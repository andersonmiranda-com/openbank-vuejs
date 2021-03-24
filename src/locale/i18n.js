import i18n from "i18next";

import es from "./es.json";
import en from "./en.json";

i18n.init({
  lng: "es",
  fallbackLng: "en",
  debug: false,
  resources: { es, en },
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export default i18n;
