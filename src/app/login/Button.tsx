/** @jsxImportSource @emotion/react */

import { COLOR } from "@/styles/color";
import Link from "next/link";

export const button = {
  padding: "0.75rem",
  paddingLeft: "3rem",
  paddingRight: "3rem",

  background: COLOR.BLACK.STANDARD,
  color: COLOR.WHITE.STANDARD,

  border: "none",
  borderRadius: "0.75rem",

  cursor: "pointer",
};

export default function Button() {
  return (
    <Link href="/build">
      <button css={button}>로그인 없이 사용하기</button>
    </Link>
  );
}
