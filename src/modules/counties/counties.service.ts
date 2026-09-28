import type { CreateCountyInput } from "./counties.types.ts";
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
