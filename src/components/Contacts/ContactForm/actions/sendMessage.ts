"use server";

// website contact form
// sending two emails one for the website owner, and a confirmation email for the user

import { rateLimitByIp } from "@/lib/rateLimiting/limiters";
import { actionClient } from "@/lib/safeAction";
import { messageSchema } from "../schemas";
import {
  contactEmailOwner,
  ContactOwnerTexts,
} from "@/emails/contactEmailOwner";
import { env } from "@/lib/env.mjs";
import {
  brandAddress,
  brandEmail,
  brandEmailBackgroundColor,
  brandEmailColor,
  brandEmailLogoUrl,
  brandEmailMutedTextColor,
  brandEmailTextColor,
  brandName,
  brandNoReplyEmail,
} from "@/appConfig";
import { contactEmailUser, ContactUserTexts } from "@/emails/contactEmailUser";
import en from "@/../messages/en.json";
import ru from "@/../messages/ru.json";
import tr from "@/../messages/tr.json";
import { Locale } from "@/i18n/config";

const getOwnerTexts = (): ContactOwnerTexts & { subject: string } => {
  return { ...tr.Emails.ContactOwner, subject: tr.Emails.ContactOwner.subject };
};
const getUserTexts = (
  locale: Locale,
  brandName: string,
): ContactUserTexts & { subject: string } => {
  switch (locale) {
    case "ru":
      return {
        ...ru.Emails.ContactUser,
        thank_you_for_contact:
          ru.Emails.ContactUser.thank_you_for_contact.replace(
            "{brandName}",
            brandName,
          ),
        subject: ru.Emails.ContactUser.subject,
      };
    case "tr":
      return {
        ...tr.Emails.ContactUser,
        thank_you_for_contact:
          tr.Emails.ContactUser.thank_you_for_contact.replace(
            "{brandName}",
            brandName,
          ),
      };

    default:
      return {
        ...en.Emails.ContactUser,
        thank_you_for_contact:
          en.Emails.ContactUser.thank_you_for_contact.replace(
            "{brandName}",
            brandName,
          ),
      };
  }
};

export const sendMessageAction = actionClient
  .inputSchema(messageSchema)
  .action(async ({ parsedInput: { name, phone, email, message, locale } }) => {
    await rateLimitByIp({
      key: "sendMessage",
      limit: 3,
      window: 24 * 60 * 60 * 1000,
    });

    // message to website owner
    const ownerTexts = getOwnerTexts();
    const emailOwner = fetch(env.SMTP_URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": env.SMTP_API_KEY,
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: brandName,
          email: brandNoReplyEmail,
        },
        to: [
          {
            email: brandEmail,
            name: brandName,
          },
        ],
        subject: `${ownerTexts.subject}: ${name}`,
        htmlContent: contactEmailOwner({
          userEmail: email,
          userMessage: message,
          userName: name,
          userPhone: phone,
          appUrl: env.NEXT_PUBLIC_URI,
          backgroundColor: brandEmailBackgroundColor,
          brandColor: brandEmailColor,
          textColor: brandEmailTextColor,
          mutedText: brandEmailMutedTextColor,
          brandAddress: brandAddress.join(", "),
          brandName,
          imgUrl: brandEmailLogoUrl,
          emailTexts: ownerTexts,
        }),
      }),
    });

    // confirmation message to client
    const userTexts = getUserTexts(locale, brandName);
    const emailUser = fetch(env.SMTP_URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": env.SMTP_API_KEY,
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: brandName,
          email: brandNoReplyEmail,
        },
        to: [
          {
            email,
            name: brandName,
          },
        ],
        subject: userTexts.subject,
        htmlContent: contactEmailUser({
          appUrl: env.NEXT_PUBLIC_URI,
          backgroundColor: brandEmailBackgroundColor,
          brandColor: brandEmailColor,
          textColor: brandEmailTextColor,
          mutedText: brandEmailMutedTextColor,
          brandAddress: brandAddress.join(", "),
          brandName,
          imgUrl: brandEmailLogoUrl,
          emailTexts: userTexts,
        }),
      }),
    });

    // processing promises
    await Promise.all([emailOwner, emailUser]);
  });
