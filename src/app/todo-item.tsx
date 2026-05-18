"use client";

import { useTransition } from "react";
import { deleteTodo, toggleTodo } from "./actions";
import type { Todo } from "@/db/schema";

export function TodoItem({ todo }: { todo: Todo }) {
  const [isPending, startTransition] = useTransition();

  return (
    <li className="flex items-center gap-3 py-2">
      <input
        type="checkbox"
        checked={todo.completed}
        disabled={isPending}
        onChange={(e) =>
          startTransition(() => toggleTodo(todo.id, e.target.checked))
        }
        className="h-4 w-4"
      />
      <span
        className={`flex-1 ${
          todo.completed ? "line-through text-zinc-400" : "text-zinc-900 dark:text-zinc-100"
        }`}
      >
        {todo.text}
      </span>
      <button
        type="button"
        disabled={isPending}
        onClick={() => startTransition(() => deleteTodo(todo.id))}
        className="text-sm text-red-600 hover:text-red-800 disabled:opacity-50"
      >
        Delete
      </button>
    </li>
  );
}
