import { getHeaderListInsight } from './insight'

export const getHeaderProductDetail = (insightDetail) =>{
  const data = insightDetail
  const title = data?.description ? `${data?.description} | Insights by Gear5` : getHeaderListInsight()
  return title
}
