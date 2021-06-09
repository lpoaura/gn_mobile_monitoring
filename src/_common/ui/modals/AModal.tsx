import React, { PropsWithChildren } from "react";
import { Modal } from "react-native";

type Props = PropsWithChildren<{
  open?: boolean;
  onClose: () => void;
}>;

export function AModal(props: Props) {
  return (
    <Modal animationType="slide" visible={props.open} onRequestClose={props.onClose}>
      {props.children}
    </Modal>
  );
}
