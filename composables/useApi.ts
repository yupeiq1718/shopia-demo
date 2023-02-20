interface Request {
  url: string,
  method: 'get'|'post'|'put'|'delete'
}

interface Response {
  status: string
  response: {
    generated_text: string
  }
}

const runtimeConfig = useRuntimeConfig()

const useShopiaApi = async ({ url, method }:Request) => {
  const response = await $fetch(`${runtimeConfig.public.apiBase}?token=${runtimeConfig.public.apiToken}${url}`, {
    method
  }) as Response

  return response
}

const readSocialPost = async (text:string) => {
  const { status, response } = await useShopiaApi({
    url: `&writer=social posts&language=Chinese&input_1=${text}`,
    method: 'post'
  })

  return { status, response }
}

export default () => ({
  readSocialPost
})
