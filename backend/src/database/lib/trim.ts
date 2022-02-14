import { Model } from 'mongoose';
/*import { CheerDoc } from './cheer/cheer_model';
import { HostDoc } from './host/host_model';
import { SubscriptionDoc } from './subscription/subscription_model';
import { TipDoc } from './tip/tip_model';*/

export default async (model: Model<any>): Promise<void> => {
  const list = await model.find({}).sort({ _id: -1 });
  const idsToKeep = list.splice(0, 50).map((x) => x._id);
  await model.deleteMany({ _id: { $not: { $in: idsToKeep } } });
};
