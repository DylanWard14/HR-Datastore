/**
 * ! Executing this script will delete all data in your database and seed it with 10 team.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from "@snaplet/seed";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const main = async () => {
  console.time("seed")
  const seed = await createSeedClient();

  // Truncate all tables in the database
  await seed.$resetDatabase();

  const { office } = await seed.office((createMany) => createMany(100, {
    StaffMembers: []
  }))

  const { level } = await seed.level((createMany) => createMany(50, {
    StaffMembers: []
  }))

  const { jobTitle } = await seed.jobTitle((createMany) => createMany(500, {
    Positions: []
  }))

  const { team } = await seed.team((createMany) => createMany(250, {
    Positions: []
  }))

  const { skill } = await seed.skill((createMany) => createMany(500, {
    staffMembers: []
  }))

  // Seed the database with 10 team
  await seed.staffMember((createMany) => createMany(36000, () => {
    const thirdOfSkills = skill.length / 3
    const skillId1 = getRandomInt(thirdOfSkills);
    const skillId2 = getRandomInt(thirdOfSkills) * 3;
    // const skillId3 = getRandomInt(thirdOfSkills) * 3;
    return {
      officeId: office[getRandomInt(office.length)].id,
      levelId: level[getRandomInt(level.length)].id,
      skills: [{
          skillId: skill[skillId1].id
        },
        // {
        //   skillId: skill[skillId2].id
        // },
        // {
        //   skillId: skill[skillId3].id
        // },
      ],
      position: {
        jobTitleId: jobTitle[getRandomInt(jobTitle.length)].id,
        teamId: team[getRandomInt(team.length)].id,
      }
    }
  }));

  // Type completion not working? You might want to reload your TypeScript Server to pick up the changes

  console.log("Database seeded successfully!");
  console.timeEnd('seed')

  process.exit();
};

main();