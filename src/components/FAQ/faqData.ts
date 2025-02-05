import en from "@/../messages/en.json";
import ru from "@/../messages/ru.json";
import tr from "@/../messages/tr.json";
import { Locale } from "@/i18n/config";

export const tattooFAQ = ({ locale = "en" }: { locale?: Locale }) => {
  switch (locale) {
    case "ru":
      return Object.values(ru.FAQ.Tattoo);
    case "tr":
      return Object.values(tr.FAQ.Tattoo);

    default:
      return Object.values(en.FAQ.Tattoo);
  }
};

export const piercingFAQ = ({ locale = "en" }: { locale?: Locale }) => {
  switch (locale) {
    case "ru":
      return Object.values(ru.FAQ.Piercing);
    case "tr":
      return Object.values(tr.FAQ.Piercing);

    default:
      return Object.values(en.FAQ.Piercing);
  }
};

export const permanentMakeupFAQ = ({ locale = "en" }: { locale?: Locale }) => {
  switch (locale) {
    case "ru":
      return Object.values(ru.FAQ.PermanentMakeup);
    case "tr":
      return Object.values(tr.FAQ.PermanentMakeup);

    default:
      return Object.values(en.FAQ.PermanentMakeup);
  }
};

export const dayBeforeFAQ = ({ locale = "en" }: { locale?: Locale }) => {
  switch (locale) {
    case "ru":
      return ru.FAQ.DayBefore;
    case "tr":
      return tr.FAQ.DayBefore;

    default:
      return en.FAQ.DayBefore;
  }
};

export const dayAfterFAQ = ({ locale = "en" }: { locale?: Locale }) => {
  switch (locale) {
    case "ru":
      return ru.FAQ.DayAfter;
    case "tr":
      return tr.FAQ.DayAfter;

    default:
      return en.FAQ.DayAfter;
  }
};
