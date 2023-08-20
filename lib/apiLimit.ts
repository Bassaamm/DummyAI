import { auth } from "@clerk/nextjs";
import prisma from "./prismadb";
import { FREE_TIER_LIMIT } from "@/constants";

export async function increaseLimitApi() {
  const { userId } = auth();
  if (!userId) return;

  const userApiLimit = await prisma.useraApiLimit.findUnique({
    where: { userId },
  });

  if (userApiLimit) {
    await prisma.useraApiLimit.update({
      where: { userId },
      data: { count: userApiLimit.count + 1 },
    });
  } else {
    await prisma.useraApiLimit.create({ data: { userId, count: 1 } });
  }
}

export async function limitChecker() {
  const { userId } = auth();

  if (!userId) return;

  const userLimitNumber = await prisma.useraApiLimit.findUnique({
    where: { userId },
  });
  if (!userLimitNumber || userLimitNumber.count < FREE_TIER_LIMIT) return true;
  else return;
}

export async function getApiNum() {
  const { userId } = auth();

  if (!userId) return 0;

  const user = await prisma.useraApiLimit.findUnique({
    where: { userId },
  });
  if (!user) return 0;
  const userLimitNum = user.count;

  return userLimitNum;
}
