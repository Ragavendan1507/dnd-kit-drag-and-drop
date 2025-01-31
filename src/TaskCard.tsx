import { useDraggable } from '@dnd-kit/core';
import { Task } from './types';
import { Card, CardContent, Typography } from '@mui/material';

type TaskCardProps = {
  task: Task;
  onButtonClick: (id: string) => void;
};

export function TaskCard({ task, onButtonClick }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-grab rounded-lg bg-neutral-700 p-4 shadow-sm hover:shadow-md"
      style={style}
      onDoubleClick={() => onButtonClick?.(task.id)}
    >
      <h3 className="font-medium text-neutral-100">{task.title}</h3>
      <p className="mt-2 text-sm text-neutral-400">{task.description}</p>

      <p className="font-medium text-neutral-100">
        {' '}
        <strong>Assigned to:</strong> {task.user.name}
      </p>
    </div>
  );
}
