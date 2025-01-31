export type TaskStatus =
  | 'groups_subGroups'
  | 'draft'
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'published'
  | 'deleted';

export type Task = {
  id: string;
  status: TaskStatus;
  title: string;
  description: string;
  user: { id: string; name: string };
};

export type Column = {
  id: TaskStatus;
  title: string;
};
