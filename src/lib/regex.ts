export const blogDividerRegex = /<Divider index={\d} \/>\n/g;

export const filenameFromURI = /[^/\\&\?]+\.\w{3,4}(?=([\?&].*$|$))/g;

export const alphanumeric = /^[a-zA-Z0-9]*$/g;

export const alphanumericWithDashUnderscore = /^[a-zA-Z0-9-_]*$/g;
