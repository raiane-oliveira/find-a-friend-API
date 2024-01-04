import { FastifyReply, FastifyRequest } from 'fastify'

export async function refreshAuth(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  await request.jwtVerify({ onlyCookie: true })

  const accessToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '7d',
      },
    },
  )

  reply.setCookie('accessToken', accessToken, {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: true,
  })

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: true,
    })
    .status(200)
}
