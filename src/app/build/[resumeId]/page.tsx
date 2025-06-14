import { createClient } from "@/utils/supabase/server";
import { getResume } from "@/utils/supabase/getResume";
import BuildScreen from "./screen";
import { RESUME_TABLE } from "@/utils/supabase/constant";

async function Build({ params }: { params: { resumeId: string } }) {
  const { resumeId } = params;
  const resumeData = await getResume(createClient, RESUME_TABLE, resumeId);

  return <BuildScreen resumeId={resumeId} initialData={resumeData} />;
}

export default Build;

export const runtime = "edge";
