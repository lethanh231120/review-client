
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const MySkeletonLoadinng = ({ count, height }) => {
  return <div className='p-2'>
    <SkeletonTheme baseColor='#F3F4F4' highlightColor='#DCDCDC' borderRadius={20} >
      <Skeleton count={count} height={height} style={{ marginTop: '10px' }}/>
    </SkeletonTheme>
  </div>
}
