import { FastifyPluginAsync } from "fastify"
import { StartBody } from "./types"

const start : FastifyPluginAsync = async(fastify , options) => 
{
  fastify.post<{
    Body : StartBody
  }>("/" , async(request , reply) => 
  {
    const { userId , serverId } = request.body

    if(!userId || !serverId)
    {
      throw fastify.httpErrors.badRequest("You have to pass the userId to start in the System Economy")
    }

    return await fastify.store.User.create({
      userId , serverId
    }).then(userData => {
      console.log(userData);
      return reply.status(201).send(userData)
    }).catch(err => {
      throw fastify.httpErrors.badRequest(err)
    })
  })  
}

export default start