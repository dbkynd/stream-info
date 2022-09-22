export interface Item {
  _id: string;
  cleared: boolean;
  payload: any;
  createdAt: string;
}

export type ListNames = 'cheers' | 'raids' | 'subscriptions' | 'tips';
