import React from "react";
import MatButton from "@material-ui/core/Button";

/**
 * Creates a button
 * @param fontWeight sets the fontweight of the button
 * @param children sets the children of the button
 * @returns returns a button
 */
export default function Button(props: any) {
  return (
    <MatButton
      {...props}
      color="secondary"
      style={{ fontWeight: props.fontWeight }}
    >
      {props.children}
    </MatButton>
  );
}
