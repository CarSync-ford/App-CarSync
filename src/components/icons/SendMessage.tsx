import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export default function SendMessageIcon(props: SvgProps) {
  return (
    <Svg
      width={props.width || 25}
      height={props.height || 25}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={props.color || "currentColor"}
      {...props}
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.242309 1.08726C0.00916912 1.70392 -0.0693452 3.99543 0.0668533 6.1786L0.315215 10.1482L6.72456 11.3457L13.1339 12.544L6.72456 13.7895L0.315215 15.0359V19.9236C0.315215 24.206 0.513905 24.8341 1.91755 24.997C3.77706 25.2121 25 13.8066 25 12.5921C25 11.5713 4.03504 0.0469988 2.09301 0.000565795C1.30786 -0.0189849 0.474648 0.470598 0.242309 1.08726Z"
        fill="currentColor"
      />
    </Svg>
  );
}
