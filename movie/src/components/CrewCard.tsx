import type { PersonInfo } from "../types/MovieDetail";
import noImage from "../assets/no-image.png";

type Props = { personInfo: PersonInfo };

export const CrewCard = ({ personInfo }: Props) => {
  const baseUrl = "https://image.tmdb.org/t/p/w500";
  const profileUrl = personInfo.profile_path
      ? `${baseUrl}${personInfo.profile_path}`
      : noImage; // 대체 이미지

  return (
    <li className="flex flex-col items-center w-[100px]">
        <img
          className="w-[100px] h-[100px] rounded-full object-cover "
          src={profileUrl}
          width={100}
          height={100}
          loading="lazy"
        />
        <span className="mt-2 text-sm text-center text-zinc-100 truncate w-full">
          {personInfo.name}
        </span>
        <span className="mt-2 text-sm text-center text-gray-400 truncate w-full">
          {personInfo.role}
        </span>
    </li>
  );
};