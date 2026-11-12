import { Plant } from '../models/plants.js';
import { Bouquet } from '../models/bouquets.js';

export const syncArchive = async (plantIds) => {
  await Plant.updateMany(
    { _id: { $in: plantIds }, amount: { $lte: 0 } },
    { state: 'archived' },
  );
  await Plant.updateMany(
    { _id: { $in: plantIds }, amount: { $gt: 0 } },
    { state: 'active' },
  );

  const bouquets = await Bouquet.find({
    'flowers.plantId': { $in: plantIds },
  }).select('flowers');

  const allIds = [
    ...new Set(
      bouquets.flatMap((b) => b.flowers.map((f) => String(f.plantId))),
    ),
  ];

  const plants = await Plant.find({ _id: { $in: allIds } }).select('state');
  const activeSet = new Set(
    plants.filter((p) => p.state === 'active').map((p) => String(p._id)),
  );

  const toActive = [];
  const toArchived = [];

  for (const b of bouquets) {
    const ok = b.flowers.every((f) => activeSet.has(String(f.plantId)));
    (ok ? toActive : toArchived).push(b._id);
  }

  await Bouquet.updateMany({ _id: { $in: toArchived } }, { state: 'archived' });
  await Bouquet.updateMany({ _id: { $in: toActive } }, { state: 'active' });
};
