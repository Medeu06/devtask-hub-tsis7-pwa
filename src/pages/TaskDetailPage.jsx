import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fakeApi } from '../services/fakeApi.js';

export default function TaskDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [dataSource, setDataSource] = useState('network');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);

    fakeApi
      .getById(id)
      .then(({ item, source }) => {
        if (!ignore) {
          setTask(item);
          setDataSource(source);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto glass-card p-6 rounded-xl animate-pulse space-y-4">
        <div className="h-6 bg-slate-800 rounded w-1/3"></div>
        <div className="h-4 bg-slate-800/60 rounded w-2/3"></div>
        <div className="h-24 bg-slate-800/40 rounded w-full"></div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="max-w-md mx-auto glass-card p-6 sm:p-8 rounded-xl text-center space-y-4">
        <div className="text-3xl">⚠️</div>
        <h2 className="text-lg font-bold text-white">Задача недоступна</h2>
        <p className="text-xs text-slate-400">{error || `Элемент с ID "${id}" не найден.`}</p>
        <div className="pt-2 flex flex-col sm:flex-row justify-center gap-2.5">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs text-slate-300 border border-slate-700"
          >
            ← Назад
          </button>
          <Link
            to="/tasks"
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-xs font-bold text-white"
          >
            К списку задач
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto glass-card p-4 sm:p-6 rounded-xl space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-xs font-mono text-indigo-400 font-bold">{task.id}</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                dataSource === 'cache'
                  ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                  : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
              }`}
            >
              {dataSource === 'cache' ? '⚡ Из кэша' : '🌐 С сервера'}
            </span>
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-white break-words">{task.title}</h1>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 sm:flex-initial px-3 py-2 text-xs bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 border border-slate-700"
          >
            ← Назад
          </button>
          <Link
            to="/tasks"
            className="flex-1 sm:flex-initial px-3 py-2 text-xs bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-bold text-center"
          >
            Все задачи
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900/80 p-3.5 sm:p-4 rounded-xl border border-slate-800 text-xs">
        <div>
          <span className="text-slate-500 block text-[10px]">1. Task ID</span>
          <span className="font-mono font-bold text-indigo-300">{task.id}</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px]">2. Категория</span>
          <span className="font-semibold text-slate-200">{task.category}</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px]">3. Приоритет</span>
          <span className="font-bold text-amber-400">{task.priority}</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px]">4. Статус</span>
          <span className="font-bold text-emerald-400">{task.status}</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px]">5. Исполнитель</span>
          <span className="text-slate-200">{task.assignee}</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px]">6. Оценка времени</span>
          <span className="font-bold text-white">{task.estimatedHours} ч.</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px]">7. Дата создания</span>
          <span className="font-mono text-slate-400">{task.createdAt}</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px]">8. Источник</span>
          <span className="text-slate-300">{dataSource === 'cache' ? 'Runtime Cache' : 'Live API'}</span>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">9. Полное описание</h3>
        <p className="p-3.5 sm:p-4 bg-slate-900/50 rounded-xl text-slate-300 leading-relaxed border border-slate-800 text-xs break-words">
          {task.description}
        </p>
      </div>
    </div>
  );
}
