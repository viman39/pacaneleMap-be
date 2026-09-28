import { prisma } from "../../db/prisma.ts";
import { Prisma } from "../../generated/prisma/client.ts";
import { CountyAlreadyExistsError } from "./counties.errors.ts";
import type { CreateCountyInput } from "./counties.types.ts";

export async function insertCounty(input: CreateCountyInput) {
  try {
    return await prisma.county.create({
      data: {
        slug: input?.slug,
        code: input.code,
        name: input.name,
        svgPath: input.svgPath,
        viewBox: input.viewBox,
        labelX: input.labelX,
        labelY: input.labelY,
      },
    });
  } catch (e: unknown) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      throw new CountyAlreadyExistsError();
    }

    throw e;
  }
}

export async function getCountyByName(countyName: string) {
  return await prisma.county.findFirst({
    where: {
      name: countyName,
      deleted: false,
    },
  });
}

export async function getAllCounties() {
  return await prisma.county.findMany({
    where: {
      deleted: false,
    },
  });
}

export async function getCountyById(id: number) {
  return await prisma.county.findFirst({
    where: {
      id: id,
      deleted: false,
    },
  });
}
