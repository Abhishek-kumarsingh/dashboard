import React, { useState } from 'react';
import { CheckCircle2, Circle, Clock, MoreHorizontal, Plus, AlertTriangle } from 'lucide-react';
import { cn } from '../../utils/cn';
import { TodoItem } from '../../data/mockData';

interface TodoListProps {
  items: TodoItem[];
  loading?: boolean;
}

const TodoList: React.FC<TodoListProps> = ({ items, loading = false }) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const filteredItems = items.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'pending') return !item.completed;
    if (filter === 'completed') return item.completed;
    return true;
  });

  const handleToggleComplete = (id: string) => {
    // In a real app, this would update the todo item in the database
    console.log(`Toggle complete for todo ${id}`);
  };

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoTitle.trim()) {
      // In a real app, this would add a new todo item to the database
      console.log(`Add new todo: ${newTodoTitle}`);
      setNewTodoTitle('');
      setShowAddForm(false);
    }
  };

  const getPriorityStyles = (priority: TodoItem['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-error-600 dark:text-error-400';
      case 'medium':
        return 'text-warning-600 dark:text-warning-400';
      case 'low':
        return 'text-success-600 dark:text-success-400';
      default:
        return 'text-neutral-600 dark:text-neutral-400';
    }
  };

  const formatDueDate = (dateString?: string) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const isOverdue = (dateString?: string) => {
    if (!dateString) return false;

    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return date < today;
  };

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 h-full overflow-hidden">
      <div className="p-5 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
        <h3 className="font-semibold">To-Do List</h3>
        <button
          className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 transition-colors"
          onClick={() => setShowAddForm(true)}
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex px-5 pt-3 border-b border-neutral-200 dark:border-neutral-700">
        <button
          className={cn(
            "px-3 py-2 text-sm font-medium border-b-2 transition-colors",
            filter === 'all'
              ? "border-primary-500 text-primary-600 dark:text-primary-400"
              : "border-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
          )}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={cn(
            "px-3 py-2 text-sm font-medium border-b-2 transition-colors",
            filter === 'pending'
              ? "border-warning-500 text-warning-600 dark:text-warning-400"
              : "border-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
          )}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button
          className={cn(
            "px-3 py-2 text-sm font-medium border-b-2 transition-colors",
            filter === 'completed'
              ? "border-success-500 text-success-600 dark:text-success-400"
              : "border-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
          )}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      {/* Add Todo Form */}
      {showAddForm && (
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/80">
          <form onSubmit={handleAddTodo}>
            <input
              type="text"
              placeholder="Add a new task..."
              className="w-full p-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 mb-2"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="px-3 py-1.5 text-sm rounded-lg border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                onClick={() => {
                  setShowAddForm(false);
                  setNewTodoTitle('');
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 text-sm rounded-lg bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700"
                disabled={!newTodoTitle.trim()}
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Todo Items */}
      {loading ? (
        <div className="p-5 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3">
              <div className="skeleton w-6 h-6 rounded-full"></div>
              <div className="flex-1">
                <div className="skeleton h-5 w-3/4 rounded mb-1"></div>
                <div className="skeleton h-4 w-1/2 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-2 max-h-[350px] overflow-y-auto">
          {filteredItems.length > 0 ? (
            <ul className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {filteredItems.map((item) => (
                <li key={item.id} className="p-3 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 rounded-lg transition-colors">
                  <div className="flex items-start gap-3">
                    <button
                      className="mt-0.5 flex-shrink-0"
                      onClick={() => handleToggleComplete(item.id)}
                    >
                      {item.completed ? (
                        <CheckCircle2 size={20} className="text-success-500 dark:text-success-400" />
                      ) : (
                        <Circle size={20} className="text-neutral-400 dark:text-neutral-500" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className={cn(
                          "font-medium text-sm truncate",
                          item.completed && "line-through text-neutral-400 dark:text-neutral-500"
                        )}>
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {item.dueDate && (
                            <span className={cn(
                              "text-xs px-2 py-0.5 rounded-full flex items-center gap-1",
                              isOverdue(item.dueDate) && !item.completed
                                ? "bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-400"
                                : "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                            )}>
                              <Clock size={12} />
                              {formatDueDate(item.dueDate)}
                            </span>
                          )}
                          <span className={cn(
                            "text-xs px-2 py-0.5 rounded-full",
                            getPriorityStyles(item.priority),
                            "bg-opacity-10 dark:bg-opacity-20"
                          )}>
                            {item.priority}
                          </span>
                        </div>
                      </div>
                      {item.description && (
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8 text-neutral-500 dark:text-neutral-400">
              <p>No tasks found</p>
            </div>
          )}
        </div>
      )}

      <div className="p-3 border-t border-neutral-200 dark:border-neutral-700 text-center">
        <button className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
          View all tasks
        </button>
      </div>
    </div>
  );
};

export default TodoList;
