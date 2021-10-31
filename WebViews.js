import React from "react";
import { WebView } from "react-native-webview";

function WebViews() {
  return <WebView source={{ uri: "https://mail.google.com/mail/u/0/#inbox" }} />;
}

export default WebViews;
