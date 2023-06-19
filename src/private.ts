import { FastifyInstance } from "fastify";
import { clerkClient, clerkPlugin, getAuth } from "@clerk/fastify";

export async function privateRoutes(app: FastifyInstance) {
  app.register(clerkPlugin);
  app.get("/private", async (request, response) => {
    const { userId } = getAuth(request);

    if (!userId) return response.status(403).send();

    const user = await clerkClient.users.getUser(userId);

    return "You're logged in";
  });
}
