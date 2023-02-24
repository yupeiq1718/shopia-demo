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

const createSocialPost = async (text:string) => {
  const { status, response } = await useShopiaApi({
    url: `&writer=social posts&language=Chinese&input_1=${text}`,
    method: 'post'
  })

  return { status, response }
}

const createArticleTitle = async (text:string) => {
  const { status, response } = await useShopiaApi({
    url: `&writer=article ideas&language=Chinese&input_1=${text}`,
    method: 'post'
  })

  return { status, response }
}

const createArticleOutline = async (text:string) => {
  const { status, response } = await useShopiaApi({
    url: `&writer=article outlines&language=Chinese&input_1=${text}`,
    method: 'post'
  })

  return { status, response }
}

const createArticleHeader = async (text:string) => {
  const { status, response } = await useShopiaApi({
    url: `&writer=article intro&language=Chinese&input_1=${text}&input_2=medium&input_3=Informative`,
    method: 'post'
  })

  return { status, response }
}

const createArticleSection = async (text:string) => {
  const { status, response } = await useShopiaApi({
    url: `&writer=article section&language=Chinese&input_1=${text}&input_2=Short&input_3=Informative`,
    method: 'post'
  })

  return { status, response }
}

const createArticleFooter = async (text:string) => {
  const { status, response } = await useShopiaApi({
    url: `&writer=summarize&language=Chinese&input_1=${text}`,
    method: 'post'
  })

  return { status, response }
}

export default () => ({
  createSocialPost, createArticleTitle, createArticleOutline, createArticleHeader, createArticleSection, createArticleFooter
})
