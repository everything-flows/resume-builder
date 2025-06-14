/** @jsxImportSource @emotion/react */
"use client";

import Tabs from "@/components/Tabs";
import Tab from "@/components/Tab";
import SignInForm from "./forms/SignInForm";
import SignUpForm from "./forms/SignUpForm";
import { container, title, pageSizeAlert, formContainer } from "./styles";
import Button from "./Button";

export default function Page() {
  return (
    <div css={container}>
      <div>
        <h1 css={title}>Awesome Resume Builder</h1>
        <p css={pageSizeAlert}>
          * PC 혹은 충분히 넓은 화면에서 사용하시는 것을 추천합니다!
        </p>
      </div>
      <Button />

      <p css={{ marginTop: "1rem", marginBottom: "1rem" }}>또는</p>

      <div css={formContainer}>
        <Tabs>
          <Tab label="로그인">
            <SignInForm />
          </Tab>
          <Tab label="회원가입">
            <SignUpForm />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
