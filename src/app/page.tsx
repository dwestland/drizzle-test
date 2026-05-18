import { desc } from "drizzle-orm";
import { db } from "@/db";
import { todos } from "@/db/schema";
import { addTodo } from "./actions";
import { TodoItem } from "./todo-item";

export default async function Home() {
  const items = await db.select().from(todos).orderBy(desc(todos.createdAt));

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-2xl flex-col py-16 px-8">
        <h1 className="text-4xl font-semibold tracking-tight text-black dark:text-zinc-50 mb-8">
          TODO list
        </h1>

        <form action={addTodo} className="flex gap-2 mb-8">
          <input
            type="text"
            name="text"
            required
            placeholder="Add a new task..."
            className="flex-1 rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          />
          <button
            type="submit"
            className="rounded-md bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-300"
          >
            Add
          </button>
        </form>

        {items.length === 0 ? (
          <p className="text-zinc-500">No tasks yet. Add one above.</p>
        ) : (
          <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {items.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
