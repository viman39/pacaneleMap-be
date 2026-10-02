import type { UAT } from "../../generated/prisma/client.ts";
import { CountyNotFoundError } from "../counties/counties.errors.ts";
import { getCounty } from "../counties/counties.service.ts";
import * as repository from "./uats.repository.ts";
import type { CreateUatInput, UpdateUatInput } from "./uats.types.ts";

export function getAllUats(): Promise<UAT[]> {
  return repository.getAllUats();
}

export async function getAllUatsByCountyId(countyId: number): Promise<UAT[]> {
  const county = await getCounty(countyId);

  if (!county) {
    throw new CountyNotFoundError();
  }

  return repository.getAllByCountyId(countyId);
}

export function getUatById(uatId: number) {
  return repository.getUatById(uatId);
}

export async function createUat(data: CreateUatInput) {
  const county = await getCounty(data.countyId);

  if (!county) {
    throw new CountyNotFoundError();
  }

  return repository.insertUat(data);
}

export function updateUat(uatId: number, updateData: UpdateUatInput) {
  return repository.updateUat(uatId, updateData);
}

export function deleteUat(uatId: number) {
  return repository.updateUat(uatId, {
    deleted: true,
  });
}
