import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function upsertUser(user, passwordHash) {
  return prisma.user.upsert({
    where: { email: user.email },
    update: {
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone ?? null,
      role: user.role,
      accountStatus: "ACTIVE",
      academicId: user.academicId,
      department: user.department ?? null,
      academicYear: user.academicYear ?? null,
      preferredTrack: user.preferredTrack ?? null,
      bio: user.bio ?? null,
      githubUsername: user.githubUsername ?? null,
      linkedinUrl: user.linkedinUrl ?? null,
      passwordHash,
      isEmailVerified: true,
    },
    create: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone ?? null,
      role: user.role,
      accountStatus: "ACTIVE",
      academicId: user.academicId,
      department: user.department ?? null,
      academicYear: user.academicYear ?? null,
      preferredTrack: user.preferredTrack ?? null,
      bio: user.bio ?? null,
      githubUsername: user.githubUsername ?? null,
      linkedinUrl: user.linkedinUrl ?? null,
      passwordHash,
      isEmailVerified: true,
    },
  });
}

async function main() {
  const password = "demo123";
  const passwordHash = await bcrypt.hash(password, 10);

  const demoUsers = [
    {
      firstName: "Sarah",
      lastName: "Admin",
      email: "admin@university.edu",
      role: "ADMIN",
      academicId: "ADMIN-0001",
      phone: "01000000001",
      department: "COMPUTER_SCIENCE",
      academicYear: "YEAR_5",
      preferredTrack: "SOFTWARE_ARCHITECTURE",
      bio: "Platform administrator responsible for managing GPMS users and system access.",
    },
    {
      firstName: "Ahmed",
      lastName: "Hassan",
      email: "ahmed.hassan@university.edu",
      role: "DOCTOR",
      academicId: "STAFF-0002",
      phone: "01000000002",
      department: "COMPUTER_SCIENCE",
      academicYear: "YEAR_5",
      preferredTrack: "CLOUD_ENGINEERING",
      bio: "Graduation project supervisor focused on scalable systems and cloud-native architecture.",
    },
    {
      firstName: "Layla",
      lastName: "Ibrahim",
      email: "layla.ibrahim@university.edu",
      role: "TA",
      academicId: "STAFF-0003",
      phone: "01000000003",
      department: "SOFTWARE_ENGINEERING",
      academicYear: "YEAR_5",
      preferredTrack: "QUALITY_ASSURANCE",
      bio: "TA supporting teams with testing strategy, release quality, and sprint execution.",
    },
    {
      firstName: "Mariam",
      lastName: "Salah",
      email: "mariam.salah@student.edu",
      role: "LEADER",
      academicId: "CS2021010",
      phone: "01000001010",
      department: "COMPUTER_SCIENCE",
      academicYear: "YEAR_4",
      preferredTrack: "FRONTEND_DEVELOPMENT",
      bio: "Team leader passionate about product design, frontend architecture, and polished user experience.",
      githubUsername: "mariam-salah",
    },
    {
      firstName: "Nour",
      lastName: "Hassan",
      email: "nour.hassan@student.edu",
      role: "LEADER",
      academicId: "CS2021002",
      phone: "01000001002",
      department: "COMPUTER_SCIENCE",
      academicYear: "YEAR_4",
      preferredTrack: "FULLSTACK_DEVELOPMENT",
      bio: "AI-focused team leader who enjoys translating research ideas into practical student products.",
      githubUsername: "nour-hassan",
    },
    {
      firstName: "Karim",
      lastName: "Mostafa",
      email: "karim.mostafa@student.edu",
      role: "LEADER",
      academicId: "CS2021003",
      phone: "01000001003",
      department: "SOFTWARE_ENGINEERING",
      academicYear: "YEAR_4",
      preferredTrack: "BACKEND_DEVELOPMENT",
      bio: "Backend-focused leader currently looking for the right project idea and teammates.",
      githubUsername: "karim-mostafa",
    },
    {
      firstName: "Ali",
      lastName: "Mahmoud",
      email: "ali.mahmoud@student.edu",
      role: "STUDENT",
      academicId: "CS2021011",
      phone: "01000001011",
      department: "SOFTWARE_ENGINEERING",
      academicYear: "YEAR_4",
      preferredTrack: "BACKEND_DEVELOPMENT",
      bio: "Backend student who enjoys API design, database modeling, and clean service architecture.",
      githubUsername: "ali-mahmoud",
    },
    {
      firstName: "Salma",
      lastName: "Youssef",
      email: "salma.youssef@student.edu",
      role: "STUDENT",
      academicId: "CS2021012",
      phone: "01000001012",
      department: "INFORMATION_TECHNOLOGY",
      academicYear: "YEAR_4",
      preferredTrack: "FRONTEND_DEVELOPMENT",
      bio: "Frontend student who loves accessible UI, smooth interactions, and thoughtful design systems.",
      githubUsername: "salma-youssef",
    },
    {
      firstName: "Hassan",
      lastName: "Omar",
      email: "hassan.omar@student.edu",
      role: "STUDENT",
      academicId: "CS2021013",
      phone: "01000001013",
      department: "CYBERSECURITY_INFOSEC",
      academicYear: "YEAR_4",
      preferredTrack: "DEVOPS",
      bio: "Security-minded student interested in deployment pipelines, infrastructure, and secure coding.",
      githubUsername: "hassan-omar",
    },
    {
      firstName: "Amira",
      lastName: "Khalil",
      email: "amira.khalil@student.edu",
      role: "STUDENT",
      academicId: "CS2021015",
      phone: "01000001015",
      department: "INFORMATION_SYSTEMS",
      academicYear: "YEAR_4",
      preferredTrack: "FULLSTACK_DEVELOPMENT",
      bio: "Full-stack student exploring collaboration opportunities and strong product-oriented teams.",
      githubUsername: "amira-khalil",
    },
    {
      firstName: "Hana",
      lastName: "Adel",
      email: "hana.adel@student.edu",
      role: "STUDENT",
      academicId: "CS2021014",
      phone: "01000001014",
      department: "COMPUTER_SCIENCE",
      academicYear: "YEAR_4",
      preferredTrack: "FRONTEND_DEVELOPMENT",
      bio: "Frontend student interested in collaborative projects, storytelling, and polished interfaces.",
      githubUsername: "hana-adel",
    },
  ];

  const users = {};

  for (const user of demoUsers) {
    const savedUser = await upsertUser(user, passwordHash);
    users[user.email] = savedUser;
  }

  await prisma.teamJoinRequest.deleteMany();
  await prisma.teamInvitation.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.team.deleteMany();

  const smartCampus = await prisma.team.create({
    data: {
      name: "Smart Campus",
      bio: "A connected campus platform for announcements, navigation, and smart facility usage insights.",
      leaderId: users["mariam.salah@student.edu"].id,
      doctorId: users["ahmed.hassan@university.edu"].id,
      taId: users["layla.ibrahim@university.edu"].id,
      inviteCode: "SMART-25A1",
      maxMembers: 5,
      visibility: "PUBLIC",
      allowJoinRequests: true,
      stage: "IMPLEMENTATION",
      stack: ["Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
    },
  });

  const aiStudyAssistant = await prisma.team.create({
    data: {
      name: "AI Study Assistant",
      bio: "An AI-powered graduation project assistant that helps students organize materials and learning plans.",
      leaderId: users["nour.hassan@student.edu"].id,
      doctorId: users["ahmed.hassan@university.edu"].id,
      taId: users["layla.ibrahim@university.edu"].id,
      inviteCode: "AISTUD-Y2B",
      maxMembers: 4,
      visibility: "PRIVATE",
      allowJoinRequests: false,
      stage: "DESIGN",
      stack: ["Python", "FastAPI", "React", "OpenAI"],
    },
  });

  await prisma.teamMember.createMany({
    data: [
      {
        teamId: smartCampus.id,
        userId: users["ali.mahmoud@student.edu"].id,
      },
      {
        teamId: smartCampus.id,
        userId: users["salma.youssef@student.edu"].id,
      },
      {
        teamId: aiStudyAssistant.id,
        userId: users["hassan.omar@student.edu"].id,
      },
    ],
  });

  await prisma.teamInvitation.create({
    data: {
      teamId: aiStudyAssistant.id,
      invitedUserId: users["amira.khalil@student.edu"].id,
      invitedById: users["nour.hassan@student.edu"].id,
      status: "PENDING",
    },
  });

  await prisma.teamJoinRequest.create({
    data: {
      teamId: smartCampus.id,
      userId: users["hana.adel@student.edu"].id,
      message: "I’d love to contribute on the frontend and help shape the student experience side of this project.",
      status: "PENDING",
    },
  });
}

main()
  .then(async () => {
    console.log("Seed completed. You can login using password: demo123");
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Seed failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
