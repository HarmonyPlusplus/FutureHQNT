import Image from 'next/image'
import shareIcon from '../../../public/assets/share.png'

const share = () => {
  return (
    <div>
      <Image
        src={shareIcon} alt="share" width={20} height={20}/>
    </div>
  )
}

export default share
