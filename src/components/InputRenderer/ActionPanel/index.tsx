/** @jsxImportSource @emotion/react */

import { COLOR } from "@/styles/color";

import SaveIcon from "@/assets/SaveIcon";
import DownloadIcon from "@/assets/DownloadIcon";
import DeleteIcon from "@/assets/DeleteIcon";
import { button, container, importantButton } from "./styles";

export default function ActionPanel({
  onSave,
  onDelete,
  fileUrl,
  fileName,
}: {
  onSave?: () => void;
  onDelete?: () => void;
  fileUrl: string | null;
  fileName: string;
}) {
  return (
    <div css={container}>
      {onSave && (
        <button
          css={button}
          onClick={() => {
            onSave();
          }}
        >
          <SaveIcon size="1.5rem" color={COLOR.WHITE.STANDARD} />
        </button>
      )}

      <button css={button}>
        <a href={fileUrl || ""} download={fileName}>
          <DownloadIcon size="1.5rem" color={COLOR.WHITE.STANDARD} />
        </a>
      </button>

      {onDelete && (
        <button
          css={[button, importantButton]}
          onClick={() => {
            onDelete();
          }}
        >
          <DeleteIcon size="1.5rem" color={COLOR.WHITE.STANDARD} />
        </button>
      )}
    </div>
  );
}
