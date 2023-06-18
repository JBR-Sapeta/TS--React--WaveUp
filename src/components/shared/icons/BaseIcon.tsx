import {
  AiOutlineClockCircle,
  AiFillInstagram,
  AiOutlineLoading3Quarters,
  AiOutlineStop,
  AiOutlineCheckCircle,
} from 'react-icons/ai';
import {
  FaRegCalendarAlt,
  FaUser,
  FaUserAlt,
  FaUsers,
  FaHeart,
  FaRegHeart,
  FaFacebook,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import {
  MdOutlineCalendarMonth,
  MdModeEdit,
  MdDelete,
  MdClose,
  MdAdd,
  MdEmail,
  MdLock,
  MdOutlineRefresh,
  MdCheck,
  MdHomeFilled,
  MdCloudUpload,
  MdOutlineSaveAlt,
  MdOutlineSearchOff,
} from 'react-icons/md';
import {
  BiMenu,
  BiErrorCircle,
  BiCheckCircle,
  BiHide,
  BiShow,
  BiImageAdd,
} from 'react-icons/bi';
import { BsFileImage, BsPersonPlusFill } from 'react-icons/bs';
import {
  IoMdSearch,
  IoIosInfinite,
  IoIosChatboxes,
  IoMdChatboxes,
  IoMdImages,
} from 'react-icons/Io';
import { ImLocation, ImSearch, ImArrowLeft } from 'react-icons/im';
import {
  RiLoginBoxFill,
  RiUser3Fill,
  RiToolsFill,
  RiLogoutBoxFill,
  RiArrowGoBackFill,
} from 'react-icons/ri';
import { RxCross2 } from 'react-icons/rx';
import { TbDotsVertical } from 'react-icons/tb';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/TI';

interface IconsType {
  [props: string]: JSX.Element;
}

interface BaseIconProps {
  name: string;
}

const Icons: IconsType = {
  AiOutlineClockCircle: <AiOutlineClockCircle />,
  AiFillInstagram: <AiFillInstagram />,
  AiOutlineLoading3Quarters: <AiOutlineLoading3Quarters />,
  AiOutlineCheckCircle: <AiOutlineCheckCircle />,
  AiOutlineStop: <AiOutlineStop />,

  BiMenu: <BiMenu />,
  BiErrorCircle: <BiErrorCircle />,
  BiCheckCircle: <BiCheckCircle />,
  BiHide: <BiHide />,
  BiShow: <BiShow />,
  BiImageAdd: <BiImageAdd />,

  BsFileImage: <BsFileImage />,
  BsPersonPlusFill: <BsPersonPlusFill />,

  FaUser: <FaUser />,
  FaUserAlt: <FaUserAlt />,
  FaUsers: <FaUsers />,
  FaHeart: <FaHeart />,
  FaRegHeart: <FaRegHeart />,
  FaRegCalendarAlt: <FaRegCalendarAlt />,
  FaFacebook: <FaFacebook />,
  FaTwitter: <FaTwitter />,
  FaYoutube: <FaYoutube />,

  ImLocation: <ImLocation />,
  ImSearch: <ImSearch />,
  ImArrowLeft:<ImArrowLeft />,

  IoMdSearch: <IoMdSearch />,
  IoIosInfinite: <IoIosInfinite />,
  IoIosChatboxes: <IoIosChatboxes />,
  IoMdChatboxes: <IoMdChatboxes />,
  IoMdImages: <IoMdImages />,

  MdOutlineCalendarMonth: <MdOutlineCalendarMonth />,
  MdModeEdit: <MdModeEdit />,
  MdDelete: <MdDelete />,
  MdClose: <MdClose />,
  MdAdd: <MdAdd />,
  MdEmail: <MdEmail />,
  MdLock: <MdLock />,
  MdCheck: <MdCheck />,
  MdHomeFilled: <MdHomeFilled />,
  MdOutlineRefresh: <MdOutlineRefresh />,
  MdCloudUpload: <MdCloudUpload />,
  MdOutlineSaveAlt: <MdOutlineSaveAlt />,
  MdOutlineSearchOff: <MdOutlineSearchOff />,

  RxCross2: <RxCross2 />,

  RiLoginBoxFill: <RiLoginBoxFill />,
  RiLogoutBoxFill: <RiLogoutBoxFill />,
  RiUser3Fill: <RiUser3Fill />,
  RiToolsFill: <RiToolsFill />,


  TbDotsVertical: <TbDotsVertical />,
  TiArrowSortedDown: <TiArrowSortedDown />,
  TiArrowSortedUp: <TiArrowSortedUp />,
};

function BaseIcon({ name }: BaseIconProps) {
  return Icons[name];
}

export default BaseIcon;
