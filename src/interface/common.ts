// src/types.ts
export enum Priorities {
  Low = "Low",
  Moderate = "Moderate",
  High = "High",
}

export enum Status {
  todo = "to-do",
  doing = "doing",
  completed = "completed",
}

export type ITask = {
  _id?: string;
  title: string;
  deadline: string;
  priority: Priorities;
  description?: string;
  status: Status;
  assignee?: string[];
  user: string;
};
