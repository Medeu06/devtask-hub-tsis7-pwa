import React from 'react';
import { Link } from 'react-router-dom';

export default function TaskCard({ task, isActionBusy, onToggleStatus, onEdit, onDelete }) {
  return (
    <div className="glass-card p-3.5 sm:p-4 rounded-xl transition-all border border-slate-800 hover:border-slate-700 flex flex-col justify-between min-w-0">
      <div>
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5 min-w-0">
            <span className="text-[10px] font-mono font-bold text-indigo-400">{task.id}</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 truncate">
              {task.category}
            </span>
          </div>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
              task.status === 'Completed'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-amber-500/20 text-amber-300'
            }`}
          >
            {task.status}
          </span>
        </div>

        <Link to={`/tasks/${task.id}`} className="block mt-2 group">
          <h3 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-2 break-words">
            {task.title}
          </h3>
        </Link>
        <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 break-words">{task.description}</p>
      </div>

      <div className="mt-4 pt-2.5 border-t border-slate-800/80 flex flex-col xs:flex-row sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-slate-400">
        <span className="truncate max-w-full">👤 {task.assignee}</span>

        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto justify-end">
          <Link
            to={`/tasks/${task.id}`}
            className="px-2.5 py-1.5 rounded bg-indigo-950/60 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/50 font-medium"
          >
            Инфо
          </Link>
          <button
            onClick={() => onToggleStatus(task.id, task.status)}
            disabled={isActionBusy}
            className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
          >
            {isActionBusy ? '...' : task.status === 'Completed' ? 'Reopen' : 'Done'}
          </button>
          <button
            onClick={() => onEdit(task)}
            className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            aria-label="Удалить задачу"
            className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-red-900/50 text-red-400 border border-slate-700"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
