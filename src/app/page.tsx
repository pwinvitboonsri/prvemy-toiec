import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = await createClient(); // ✅ no cookies() needed here
  const { data: todos, error } = await supabase.from("todos").select("*");

  if (error) {
    console.error("Error loading todos:", error.message);
  }

  return (
    <ul>
      {todos?.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
