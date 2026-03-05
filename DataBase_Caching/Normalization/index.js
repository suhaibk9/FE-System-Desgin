// ============================================================
// THE MASSIVE, DEEPLY NESTED, DENORMALIZED DATA
// Imagine this is what a REST API returns. It's a nightmare.
// ============================================================

const denormalizedData = {
  company: {
    id: "c1",
    name: "TechNova Inc.",
    founded: 2015,
    ceo: {
      id: "u1",
      name: "Sarah Chen",
      email: "sarah@technova.com",
    },
    headquarters: {
      id: "loc1",
      city: "San Francisco",
      country: "USA",
      coordinates: { lat: 37.7749, lng: -122.4194 },
    },
    departments: [
      {
        id: "d1",
        name: "Engineering",
        budget: 5000000,
        head: {
          id: "u2",
          name: "Raj Patel",
          email: "raj@technova.com",
          role: "VP of Engineering",
        },
        teams: [
          {
            id: "t1",
            name: "Frontend",
            lead: {
              id: "u3",
              name: "Akshay Kumar",
              email: "akshay@technova.com",
            },
            members: [
              {
                id: "u4",
                name: "Priya Sharma",
                email: "priya@technova.com",
                skills: ["React", "TypeScript", "GraphQL"],
                projects: [
                  {
                    id: "p1",
                    name: "Customer Dashboard",
                    status: "active",
                    deadline: "2025-06-01",
                    tasks: [
                      {
                        id: "task1",
                        title: "Build sidebar",
                        status: "done",
                        assignee: { id: "u4", name: "Priya Sharma" },
                      },
                      {
                        id: "task2",
                        title: "API integration",
                        status: "in-progress",
                        assignee: { id: "u4", name: "Priya Sharma" },
                      },
                    ],
                    client: {
                      id: "cl1",
                      name: "MegaCorp",
                      industry: "Finance",
                      contact: {
                        id: "u10",
                        name: "John Doe",
                        email: "john@megacorp.com",
                      },
                    },
                  },
                ],
              },
              {
                id: "u5",
                name: "Chirag Mehta",
                email: "chirag@technova.com",
                skills: ["Vue", "CSS", "Figma"],
                projects: [
                  {
                    id: "p2",
                    name: "Marketing Website Redesign",
                    status: "active",
                    deadline: "2025-04-15",
                    tasks: [
                      {
                        id: "task3",
                        title: "Hero section",
                        status: "done",
                        assignee: { id: "u5", name: "Chirag Mehta" },
                      },
                      {
                        id: "task4",
                        title: "Responsive nav",
                        status: "todo",
                        assignee: { id: "u5", name: "Chirag Mehta" },
                      },
                    ],
                    client: {
                      id: "cl2",
                      name: "StartupXYZ",
                      industry: "SaaS",
                      contact: {
                        id: "u11",
                        name: "Jane Smith",
                        email: "jane@startupxyz.com",
                      },
                    },
                  },
                ],
              },
            ],
          },
          {
            id: "t2",
            name: "Backend",
            lead: {
              id: "u6",
              name: "Deepak Verma",
              email: "deepak@technova.com",
            },
            members: [
              {
                id: "u7",
                name: "Anita Roy",
                email: "anita@technova.com",
                skills: ["Node.js", "PostgreSQL", "Docker"],
                projects: [
                  {
                    id: "p3",
                    name: "Auth Microservice",
                    status: "completed",
                    deadline: "2025-01-30",
                    tasks: [
                      {
                        id: "task5",
                        title: "JWT implementation",
                        status: "done",
                        assignee: { id: "u7", name: "Anita Roy" },
                      },
                      {
                        id: "task6",
                        title: "OAuth2 Google login",
                        status: "done",
                        assignee: { id: "u7", name: "Anita Roy" },
                      },
                    ],
                    client: {
                      id: "cl1",
                      name: "MegaCorp",
                      industry: "Finance",
                      contact: {
                        id: "u10",
                        name: "John Doe",
                        email: "john@megacorp.com",
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "d2",
        name: "Design",
        budget: 2000000,
        head: {
          id: "u8",
          name: "Mira Kapoor",
          email: "mira@technova.com",
          role: "Head of Design",
        },
        teams: [
          {
            id: "t3",
            name: "UX Research",
            lead: {
              id: "u9",
              name: "Kabir Singh",
              email: "kabir@technova.com",
            },
            members: [
              {
                id: "u12",
                name: "Zara Khan",
                email: "zara@technova.com",
                skills: ["User Testing", "Wireframing", "Figma"],
                projects: [
                  {
                    id: "p4",
                    name: "Mobile App UX Audit",
                    status: "active",
                    deadline: "2025-05-20",
                    tasks: [
                      {
                        id: "task7",
                        title: "User interviews",
                        status: "in-progress",
                        assignee: { id: "u12", name: "Zara Khan" },
                      },
                      {
                        id: "task8",
                        title: "Heuristic evaluation",
                        status: "todo",
                        assignee: { id: "u12", name: "Zara Khan" },
                      },
                    ],
                    client: {
                      id: "cl3",
                      name: "HealthPlus",
                      industry: "Healthcare",
                      contact: {
                        id: "u13",
                        name: "Dr. Emily White",
                        email: "emily@healthplus.com",
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

console.log("========== DENORMALIZED (Nested) ==========");
console.log(denormalizedData);

// ============================================================
// THE NORMALIZATION FUNCTION
// We walk through the entire nested tree and extract every
// entity into its own flat lookup table (like a SQL database).
// ============================================================

function normalize(data) {
  const entities = {
    companies: {},
    locations: {},
    departments: {},
    teams: {},
    users: {},
    projects: {},
    tasks: {},
    clients: {},
  };

  const company = data.company;

  // --- Company ---
  entities.companies[company.id] = {
    id: company.id,
    name: company.name,
    founded: company.founded,
    ceoId: company.ceo.id,
    headquartersId: company.headquarters.id,
    departmentIds: company.departments.map((d) => d.id),
  };

  // --- CEO (is just a user) ---
  entities.users[company.ceo.id] = {
    id: company.ceo.id,
    name: company.ceo.name,
    email: company.ceo.email,
  };

  // --- Location ---
  entities.locations[company.headquarters.id] = {
    id: company.headquarters.id,
    city: company.headquarters.city,
    country: company.headquarters.country,
    lat: company.headquarters.coordinates.lat,
    lng: company.headquarters.coordinates.lng,
  };

  // --- Walk through Departments ---
  company.departments.forEach((dept) => {
    entities.departments[dept.id] = {
      id: dept.id,
      name: dept.name,
      budget: dept.budget,
      headId: dept.head.id,
      teamIds: dept.teams.map((t) => t.id),
    };

    // Department Head (user)
    entities.users[dept.head.id] = {
      id: dept.head.id,
      name: dept.head.name,
      email: dept.head.email,
      role: dept.head.role,
    };

    // --- Walk through Teams ---
    dept.teams.forEach((team) => {
      entities.teams[team.id] = {
        id: team.id,
        name: team.name,
        departmentId: dept.id,
        leadId: team.lead.id,
        memberIds: team.members.map((m) => m.id),
      };

      // Team Lead (user)
      entities.users[team.lead.id] = {
        id: team.lead.id,
        name: team.lead.name,
        email: team.lead.email,
      };

      // --- Walk through Members ---
      team.members.forEach((member) => {
        entities.users[member.id] = {
          id: member.id,
          name: member.name,
          email: member.email,
          skills: member.skills,
          projectIds: member.projects.map((p) => p.id),
        };

        // --- Walk through Projects ---
        member.projects.forEach((project) => {
          entities.projects[project.id] = {
            id: project.id,
            name: project.name,
            status: project.status,
            deadline: project.deadline,
            clientId: project.client.id,
            taskIds: project.tasks.map((t) => t.id),
          };

          // --- Client ---
          entities.clients[project.client.id] = {
            id: project.client.id,
            name: project.client.name,
            industry: project.client.industry,
            contactId: project.client.contact.id,
          };

          // Client Contact (user)
          entities.users[project.client.contact.id] = {
            id: project.client.contact.id,
            name: project.client.contact.name,
            email: project.client.contact.email,
          };

          // --- Walk through Tasks ---
          project.tasks.forEach((task) => {
            entities.tasks[task.id] = {
              id: task.id,
              title: task.title,
              status: task.status,
              assigneeId: task.assignee.id,
              projectId: project.id,
            };
          });
        });
      });
    });
  });

  return entities;
}

// ============================================================
// RUN IT
// ============================================================
const normalizedData = normalize(denormalizedData);

console.log("========== NORMALIZED (Flat Lookup Tables) ==========");
console.log(normalizedData);

// Now you can access any entity directly by ID in O(1) time:
console.log("\n--- Quick Lookups ---");
console.log("User u4:", normalizedData.users["u4"]);
console.log("Project p1:", normalizedData.projects["p1"]);
console.log("Task task2:", normalizedData.tasks["task2"]);
console.log("Client cl1:", normalizedData.clients["cl1"]);
console.log("Department d1:", normalizedData.departments["d1"]);
