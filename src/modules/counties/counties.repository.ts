import { prisma } from "../../db/prisma.ts";
import { Prisma, type County } from "../../generated/prisma/client.ts";
import {
  CountyAlreadyExistsError,
  CountyNotFoundError,
} from "./counties.errors.ts";
import type { CreateCountyInput, UpdateCountyInput } from "./counties.types.ts";

export async function insertCounty(input: CreateCountyInput) {
  try {
    return await prisma.county.create({
      data: {
        slug: input?.slug,
        code: input.code,
        name: input.name,
        svgPath: input.svgPath,
        viewBox: input.viewBox,
        codeX: input.codeX,
        codeY: input.codeY,
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

export function getAllCounties() {
  return prisma.county.findMany({
    where: {
      deleted: false,
    },
    select: {
      id: true,
      slug: true,
      code: true,
      name: true,
      svgPath: true,
      viewBox: true,
      codeX: true,
      codeY: true,
      _count: {
        select: {
          uats: {
            where: {
              deleted: false,
            },
          },
        },
      },
    },
  });
}

export function getSlotsStatusTotalsByCounty(countyId?: number) {
  return prisma.uAT.groupBy({
    by: ["countyId"],
    where: countyId
      ? {
          deleted: false,
          county: { deleted: false },
          countyId: countyId,
        }
      : {
          deleted: false,
          county: { deleted: false },
        },
    _sum: {
      slotsStatus: true,
    },
  });
}

export function getPopulatedUatsByCounty(countyId?: number) {
  return prisma.uAT.groupBy({
    by: ["countyId"],
    where: countyId
      ? {
          deleted: false,
          population: { gte: 15000 },
          county: { deleted: false },
          countyId: countyId,
        }
      : {
          deleted: false,
          population: { gte: 15000 },
          county: { deleted: false },
        },
    _count: {
      _all: true,
    },
  });
}

export async function getCountyById(id: number) {
  return await prisma.county.findFirst({
    where: {
      id: id,
      deleted: false,
    },
    select: {
      id: true,
      slug: true,
      code: true,
      name: true,
      svgPath: true,
      viewBox: true,
      codeX: true,
      codeY: true,
      _count: {
        select: {
          uats: {
            where: {
              deleted: false,
            },
          },
        },
      },
    },
  });
}

export async function updateCounty(id: number, data: UpdateCountyInput) {
  try {
    return await prisma.county.update({
      where: {
        id,
        deleted: false,
      },
      data: {
        ...data,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        throw new CountyNotFoundError();
      }
      if (e.code === "P2002") {
        throw new CountyAlreadyExistsError();
      }
    }

    throw e;
  }
}
