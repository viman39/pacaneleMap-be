import type {
  CreateCountyInput,
  CountyWithStats,
  UpdateCountyInput,
} from "./counties.types.ts";
import * as repository from "./counties.repository.ts";

export function createCounty(countyData: CreateCountyInput) {
  return repository.insertCounty(countyData);
}

export async function getAllCounties(): Promise<CountyWithStats[]> {
  const [counties, slotsTotals, populatedUats, slotsPassed] = await Promise.all(
    [
      repository.getAllCounties(),
      repository.getSlotsStatusTotalsByCounty(),
      repository.getPopulatedUatsByCounty(),
      repository.getUatsStatusCountByCounty(),
    ],
  );

  const slotsTotalsByCountyId = new Map(
    slotsTotals.map((item) => [item.countyId, item._sum.slotsStatus]),
  );

  const populatedUATSByCountyId = new Map(
    populatedUats.map((item) => [item.countyId, item._count._all]),
  );

  const slotsPassedByCountyId = new Map(
    slotsPassed.map((item) => [item.countyId, item._count._all]),
  );

  return counties.map((county) => ({
    ...county,
    slotsStatusSum: slotsTotalsByCountyId.get(county.id) ?? 0,
    uatsOver15000Count: populatedUATSByCountyId.get(county.id) ?? 0,
    uatsStatus4Count: slotsPassedByCountyId.get(county.id) ?? 0,
  }));
}

export async function getCounty(id: number): Promise<CountyWithStats | null> {
  const [county, slotsTotal, populatedUats, slotsPassed] = await Promise.all([
    repository.getCountyById(id),
    repository.getSlotsStatusTotalsByCounty(id),
    repository.getPopulatedUatsByCounty(id),
    repository.getUatsStatusCountByCounty(id),
  ]);

  return county
    ? {
        ...county,
        slotsStatusSum: slotsTotal?.[0]?._sum?.slotsStatus ?? 0,
        uatsOver15000Count: populatedUats?.[0]?._count?._all ?? 0,
        uatsStatus4Count: slotsPassed?.[0]?._count?._all ?? 0,
      }
    : null;
}

export function updateCounty(id: number, data: UpdateCountyInput) {
  return repository.updateCounty(id, data);
}

export function deleteCounty(id: number) {
  return repository.updateCounty(id, {
    deleted: true,
  });
}
