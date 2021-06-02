import React from "react";
import { AText } from "../text/AText";
import { ColorsTheme } from "../Colors.theme";

export function GNMMLogo() {
  return (
    <>
      <AText color={ColorsTheme.primary} theme="logo">
        GN
      </AText>
      <AText color={ColorsTheme.primary} theme="logo" style={{ marginTop: -10 }}>
        Monitoring
      </AText>
    </>
  );
}
