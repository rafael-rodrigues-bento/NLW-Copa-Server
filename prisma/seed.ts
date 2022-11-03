import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john.doe@email.com",
      avatarUrl: "https://github.com/rafael-rodrigues-bento.png"
    }
  })

  const pool = await prisma.pool.create({
    data: {
      title: "Example Pool",
      code: "BOL123",
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id
        }
      }
    }
  })

  await prisma.game.create({
    data: {
      date: "2022-11-15T12:00:00.314Z",
      firstTeamCountryCode: "DE",
      secondTeamCountryCode: "BR"
    }
  })

  await prisma.game.create({
    data: {
      date: "2022-11-19T12:00:00.314Z",
      firstTeamCountryCode: "BR",
      secondTeamCountryCode: "AR",

      guesses: {
        create: {
          firstTeamPoints: 3,
          secondTeamPoints: 1,

          participant:{
            connect:{
              poolId_userId: {
                userId: user.id,
                poolId: pool.id,
            }
          }
         }
        }
      }
    }
  })
}

main();