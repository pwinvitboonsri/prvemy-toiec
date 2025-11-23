import { AlertComponent } from "@/Components/ui/AlertComponent";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = await createClient(); // ✅ no cookies() needed here
  const { data: todos, error } = await supabase.from("todos").select("*");

  return (
    <AlertComponent
      title="test"
      description="Hello World I want to test aalert "
    />
  );
}
