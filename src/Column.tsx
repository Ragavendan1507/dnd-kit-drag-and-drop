import { useDroppable } from '@dnd-kit/core';
import { TaskCard } from './TaskCard';
import { Column as ColumnType, Task } from './types';

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
  onButtonClick: (id: string) => void;
};

export function Column({ column, tasks, onButtonClick }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div className="flex w-80 flex-col rounded-lg bg-neutral-800 p-4">
      <h2 className="mb-4 font-semibold text-neutral-100">{column.title}</h2>
      <div ref={setNodeRef} className="flex flex-1 flex-col gap-4">
        {tasks.map((task) => {
          return (
            <TaskCard key={task.id} task={task} onButtonClick={onButtonClick} />
          );
        })}
      </div>
    </div>
  );
}
