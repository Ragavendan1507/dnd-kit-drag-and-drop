import { useState } from 'react';
import type { Task, Column as ColumnType } from './types';
import { Column } from './Column';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Card, Avatar, Box, Grid, Typography, Chip } from '@mui/material';

const USERS = [
  { id: '101', name: 'Alice' },
  { id: '102', name: 'Bob' },
  { id: '103', name: 'Charlie' },
  { id: '104', name: 'Diana' },
  { id: '105', name: 'Eve' },
];

const COLUMNS: ColumnType[] = [
  { id: 'groups_subGroups', title: 'Groups And SubGroups' },
  { id: 'draft', title: 'Draft' },
  { id: 'pending', title: 'Pending' },
  { id: 'approved', title: 'Approved' },
  { id: 'rejected', title: 'Rejected' },
  { id: 'published', title: 'Published' },
  { id: 'deleted', title: 'Deleted' },
];

const INITIAL_TASKS: any[] = [
  {
    id: '1',
    title: 'Research Project',
    description: 'Gather requirements and create initial documentation',
    status: 'groups_subGroups',
    user: { id: '101', name: 'Alice' },
  },
  {
    id: '2',
    title: 'Initial Draft',
    description: 'Draft initial report for the project',
    status: 'draft',
    user: { id: '101', name: 'Alice' },
  },
  {
    id: '3',
    title: 'API Cleanup',
    description: 'Remove unused endpoints from API',
    status: 'deleted',
    user: { id: '101', name: 'Alice' },
  },
  {
    id: '4',
    title: 'Design System',
    description: 'Create component library and design tokens',
    status: 'groups_subGroups',
    user: { id: '102', name: 'Bob' },
  },
  {
    id: '5',
    title: 'UI Design',
    description: 'Create wireframes for the main dashboard',
    status: 'pending',
    user: { id: '102', name: 'Bob' },
  },
  {
    id: '6',
    title: 'Testing Framework',
    description: 'Set up Jest and React Testing Library',
    status: 'approved',
    user: { id: '102', name: 'Bob' },
  },
  {
    id: '7',
    title: 'API Integration',
    description: 'Implement REST API endpoints',
    status: 'groups_subGroups',
    user: { id: '103', name: 'Charlie' },
  },
  {
    id: '8',
    title: 'Bug Fixes',
    description: 'Fix critical bugs reported during testing',
    status: 'rejected',
    user: { id: '103', name: 'Charlie' },
  },
  {
    id: '9',
    title: 'Documentation',
    description: 'Document API endpoints for external developers',
    status: 'published',
    user: { id: '103', name: 'Charlie' },
  },
  {
    id: '10',
    title: 'Test Coverage',
    description: 'Improve test coverage to 90%',
    status: 'groups_subGroups',
    user: { id: '104', name: 'Diana' },
  },
  {
    id: '11',
    title: 'Peer Reviews',
    description: 'Review PRs for upcoming release',
    status: 'draft',
    user: { id: '104', name: 'Diana' },
  },
  {
    id: '12',
    title: 'Release Notes',
    description: 'Prepare release notes for the upcoming version',
    status: 'published',
    user: { id: '104', name: 'Diana' },
  },
  {
    id: '13',
    title: 'Core Features',
    description: 'Complete development of core features',
    status: 'approved',
    user: { id: '105', name: 'Eve' },
  },
  {
    id: '14',
    title: 'Integration Testing',
    description: 'Conduct end-to-end testing with the staging environment',
    status: 'pending',
    user: { id: '105', name: 'Eve' },
  },
  {
    id: '15',
    title: 'Old Files Cleanup',
    description: 'Remove outdated and unused files',
    status: 'deleted',
    user: { id: '105', name: 'Eve' },
  },
];

export default function App() {
  const [tasks, setTasks] = useState<any[]>(INITIAL_TASKS);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  const toggleUserSelection = (userId: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  const filteredTasks = tasks.filter(
    (task) =>
      selectedUserIds.length === 0 || selectedUserIds.includes(task.user.id),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task['status'];
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task,
      ),
    );
  };

  const handleTaskButtonClick = (taskId: string) => {
    alert(`Button clicked for Task ID: ${taskId}`);
  };

  return (
    <div className="p-4">
      <Box mb={4} display="flex" gap={2}>
        {USERS.map((user) => (
          <Chip
            key={user.id}
            label={user.name.charAt(0).toUpperCase()}
            onClick={() => toggleUserSelection(user.id)}
            title={user.name}
            sx={{
              backgroundColor: selectedUserIds.includes(user.id)
                ? '#1976D2'
                : '#E0E0E0',
              color: selectedUserIds.includes(user.id) ? '#FFF' : '#000',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          />
        ))}
      </Box>
      <div className="flex gap-8">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((column) => {
            return (
              <Column
                key={column.id}
                column={column}
                tasks={filteredTasks.filter(
                  (task) => task.status === column.id,
                )}
                onButtonClick={handleTaskButtonClick}
              />
            );
          })}
        </DndContext>
      </div>
    </div>
  );
}
