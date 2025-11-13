import Image from 'next/image'
import replyIcon from '../../../public/assets/reply.png'

const reply = () => {
  return (
    <div>
      <Image src={replyIcon} alt="reply" width={20} height={20}/>
    </div>
  )
}

export default reply
