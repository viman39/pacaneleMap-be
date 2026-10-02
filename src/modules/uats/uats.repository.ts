import { prisma } from "../../db/prisma.ts";
import { Prisma } from "../../generated/prisma/client.ts";
import { UatAlreadyExistsError, UatNotFoundError } from "./uats.errors.ts";
import type { CreateUatInput, UpdateUatInput } from "./uats.types.ts";

export async function getAllUats() {
  return await prisma.uAT.findMany({
    where: {
      deleted: false,
    },
  });
}

export async function getAllByCountyId(countyId: number) {
  return await prisma.uAT.findMany({
    where: {
      countyId: countyId,
      deleted: false,
    },
  });
}

export async function getUatById(uatId: number) {
  return await prisma.uAT.findFirst({
    where: {
      id: uatId,
      deleted: false,
    },
  });
}

export async function insertUat(uatData: CreateUatInput) {
  try {
    return await prisma.uAT.create({
      data: {
        countyId: uatData.countyId,
        name: uatData.name,
        siruta: uatData.siruta,
        svgPath: uatData.svgPath,
        isResidence: uatData?.isResidence,
        slotsStatus: uatData?.slotsStatus,
        population: uatData?.population,
        hallMail: uatData?.hallMail,
        petitionLink: uatData?.petitionLink,
      },
    });
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      throw new UatAlreadyExistsError();
    }

    throw e;
  }
}

export async function updateUat(uatId: number, updateData: UpdateUatInput) {
  try {
    return await prisma.uAT.update({
      where: {
        id: uatId,
        deleted: false,
      },
      data: {
        ...updateData,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        throw new UatNotFoundError();
      }
      if (e.code === "P2002") {
        throw new UatAlreadyExistsError();
      }
    }

    throw e;
  }
}
