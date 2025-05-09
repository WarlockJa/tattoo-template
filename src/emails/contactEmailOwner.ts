/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */

import { brandFB, brandIG, brandX } from "@/appConfig";

export interface ContactOwnerTexts {
  new_website_contact: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  copyright: string;
}

interface IContactOwnerEmailProps {
  imgUrl: string;
  // bucketUrl: string;
  brandName: string;
  brandAddress: string;
  appUrl: string;
  backgroundColor: string;
  brandColor: string;
  textColor: string;
  mutedText: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  userMessage: string;
  emailTexts: ContactOwnerTexts;
}

export function contactEmailOwner({
  appUrl,
  // bucketUrl,
  backgroundColor,
  brandAddress,
  brandColor,
  brandName,
  imgUrl,
  mutedText,
  textColor,
  userEmail,
  userMessage,
  userName,
  userPhone,
  emailTexts,
}: IContactOwnerEmailProps) {
  return `
    <body style="padding-top: 8px; padding-bottom: 8px">
    <table
      width="100%"
      border="0"
      cellspacing="20"
      cellpadding="0"
      style="
        background: ${backgroundColor};
        max-width: 600px;
        margin: auto;
        border-top: 10px solid ${brandColor};
        font-family: Helvetica, Arial, sans-serif;
      "
    >
      <tr>
        <td
          align="center"
          style="
            padding: 10px 0px;
            font-size: 22px;
            font-family: Helvetica, Arial, sans-serif;
            color: ${textColor};
          "
        >
          <img
            src="${imgUrl}"
            style="max-height: 3em"
            alt="${brandName}"
          />
        </td>
      </tr>
      <tr>
        <td style="font-size: 1.3rem; text-align: center; line-height: 2">
          ${emailTexts.new_website_contact}
        </td>
      </tr>
      <tr>
        <td style="font-size: 1rem; line-height: 2">
          <span style="display: inline-block; width: 5em; color: ${mutedText}"
            >${emailTexts.name}:</span
          >${userName}
          <br />
          <span style="display: inline-block; width: 5em; color: ${mutedText}"
            >${emailTexts.phone}:</span
          >${userPhone}
          <br />
          <span style="display: inline-block; width: 5em; color: ${mutedText}"
            >${emailTexts.email}:</span
          >${userEmail}
          <br />
          <span style="display: inline-block; width: 5em; color: ${mutedText}"
            >${emailTexts.message}:</span
          >${userMessage}
        </td>
      </tr>
      <tr>
        <td align="center" style="line-height: 0; color: ${mutedText}">
          ${emailTexts.copyright} © ${new Date().getFullYear()} ${brandName}
        </td>
      </tr>
      <tr>
        <td align="center" style="color: ${mutedText}; line-height: 0">
          ${brandAddress}
        </td>
      </tr>
      <tr>
        <td align="center" style="font-family: Helvetica, Arial, sans-serif">
          <span
            ><a
              href="${appUrl}"
              style="text-decoration: none; color: ${mutedText}; line-height: 0"
              >${appUrl?.slice(8)}</a
            ></span
          >
        </td>
      </tr>
      <tr>
        <td align="center">
          <a href="${brandX}" target="_blank" title="X Twitter"
            ><img
              style="opacity: 0.6; margin-right: 1em; width: 2em"
              src="${appUrl}/x.png"
              alt="X Twitter"
          /></a>
          <a href="${brandFB}" target="_blank" title="Facebook"
            ><img
              style="opacity: 0.6; margin-right: 1em; width: 2em"
              src="${appUrl}/facebook.png"
              alt="Facebook"
          /></a>
          <a href="${brandIG}" target="_blank" title="Instagram"
            ><img
              style="opacity: 0.6; width: 2em"
              src="${appUrl}/instagram.png"
              alt="Instagram"
          /></a>
        </td>
      </tr>
    </table>
  </body>
    `;
}
