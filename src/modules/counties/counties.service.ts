import type { CreateCountyInput, UpdateCountyInput } from "./counties.types.ts";
import * as repository from "./counties.repository.ts";

export function createCounty(countyData: CreateCountyInput) {
  return repository.insertCounty(countyData);
}

export function getAllCounties() {
  return repository.getAllCounties();
}

export function getCounty(id: number) {
  return repository.getCountyById(id);
}

export function updateCounty(id: number, data: UpdateCountyInput) {
  return repository.updateCounty(id, data);
}

export function deleteCounty(id: number) {
  return repository.updateCounty(id, {
    deleted: true,
  });
}
