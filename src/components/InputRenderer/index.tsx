/** @jsxImportSource @emotion/react */

import { Page } from "./styles";
import ActionPanel from "./ActionPanel";

import { Contact, Resume, SectionItem } from "@/types/resume";
import Section from "./Section";
import FileName from "./FileName";
import Color from "./Color";
import UserInfo, { UserInfoFields } from "./UserInfo";
import ContactInput from "./Contact";
import { Dispatch, SetStateAction } from "react";
import SectionItemRenderer from "./SectionItemRenderer";
import CreateButton from "./CreateButton";
import { TEXT_SECTION_TEMPLATE } from "./CreateButton/template";

const InputPage = ({
  data,
  setData,
  mainColor,
  setMainColor,
  resumeFileName,
  setResumeFileName,
  onSave,
  onDelete,
  fileUrl,
  fileName,
}: {
  data: Resume;
  setData: Dispatch<SetStateAction<Resume>>;
  mainColor: string;
  setMainColor: Dispatch<SetStateAction<string>>;
  resumeFileName: string;
  setResumeFileName: Dispatch<SetStateAction<string>>;
  onSave?: () => void;
  onDelete?: () => void;
  fileUrl: string | null;
  fileName: string;
}) => {
  function setUserInfo(field: UserInfoFields, value: string) {
    const newUserInfo = { ...data.userInfo };
    newUserInfo[field] = value;
    setData({ ...data, userInfo: newUserInfo });
  }

  function setSectionItem(newSectionItem: SectionItem, index: number) {
    const prevSectionList = data.sectionList;
    setData({
      ...data,
      sectionList: prevSectionList.map(
        (prevSectionItem, prevSectionItemIndex) =>
          prevSectionItemIndex === index ? newSectionItem : prevSectionItem
      ),
    });
  }

  function setContactData({ contact }: { contact: Contact[] }) {
    setData({
      ...data,
      userInfo: { ...data.userInfo, contact },
    });
  }

  function onAddSection() {
    setData({
      ...data,
      sectionList: data.sectionList.concat(TEXT_SECTION_TEMPLATE),
    });
  }

  return (
    <Page>
      <ActionPanel
        onSave={onSave}
        onDelete={onDelete}
        fileUrl={fileUrl}
        fileName={fileName}
      />

      {/* ---------- 파일 이름 ---------- */}
      <Section title="파일 이름" color={mainColor}>
        <FileName
          resumeFileName={resumeFileName}
          setResumeFileName={setResumeFileName}
        />
      </Section>

      {/* ---------- 색상 선택 ---------- */}
      <Section title="색상 선택" color={mainColor}>
        <Color color={mainColor} setColor={setMainColor} />
      </Section>

      {/* ---------- 기본 정보 ---------- */}
      <Section title="기본 정보" color={mainColor}>
        <>
          <UserInfo data={data.userInfo} setUserInfo={setUserInfo} />
          <ContactInput
            data={data.userInfo.contact}
            setContactData={setContactData}
          />
        </>
      </Section>

      {data.sectionList.map((sectionItem, sectionItemIdx) => (
        <Section
          key={sectionItemIdx}
          title={sectionItem.title}
          color={mainColor}
        >
          <SectionItemRenderer
            sectionItem={sectionItem}
            setSectionItem={(newSectionItem: SectionItem) => {
              setSectionItem(newSectionItem, sectionItemIdx);
            }}
          />
        </Section>
      ))}

      <CreateButton type="섹션" onClick={onAddSection} />
    </Page>
  );
};

export default InputPage;
