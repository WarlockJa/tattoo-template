/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */

import { brandFB, brandX, brandYT } from "@/appConfig";

interface IMagicLinkEmailProps {
  imgUrl: string;
  bucketUrl: string;
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
}

export function contactEmailOwner({
  appUrl,
  bucketUrl,
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
}: IMagicLinkEmailProps) {
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
          You have a new website contact
        </td>
      </tr>
      <tr>
        <td style="font-size: 1rem; line-height: 2">
          <span style="display: inline-block; width: 5em; color: ${mutedText}"
            >Name:</span
          >${userName}
          <br />
          <span style="display: inline-block; width: 5em; color: ${mutedText}"
            >Phone:</span
          >${userPhone}
          <br />
          <span style="display: inline-block; width: 5em; color: ${mutedText}"
            >Email:</span
          >${userEmail}
          <br />
          <span style="display: inline-block; width: 5em; color: ${mutedText}"
            >Message:</span
          >${userMessage}
        </td>
      </tr>
      <tr>
        <td align="center" style="line-height: 0; color: ${mutedText}">
          Copyright © ${new Date().getFullYear()} ${brandName}
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
              style="opacity: 0.6; margin-right: 1em"
              src="${bucketUrl}/x.png"
              alt="X Twitter"
          /></a>
          <a href="${brandFB}" target="_blank" title="Facebook"
            ><img
              style="opacity: 0.6; margin-right: 1em"
              src="${bucketUrl}/facebook.png"
              alt="Facebook"
          /></a>
          <a href="${brandYT}" target="_blank" title="YouTube"
            ><img
              style="opacity: 0.6"
              src="${bucketUrl}/youtube.png"
              alt="YouTube"
          /></a>
        </td>
      </tr>
    </table>
  </body>
    `;
}
