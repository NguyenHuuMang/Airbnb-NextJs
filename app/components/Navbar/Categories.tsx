"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";

import CategoryBox from "../CategoryBox";
import Container from "../Container";

export const categories = [
  {
    label: "Bãi biển",
    icon: TbBeach,
    description: "Khách sạn gần bãi biển!",
  },
  {
    label: "Cối xay gió",
    icon: GiWindmill,
    description: "Khách sạn gần cối xay gió!",
  },
  {
    label: "Hiện đại",
    icon: MdOutlineVilla,
    description: "Khách sạn hiện đại!",
  },
  {
    label: "Nông thôn",
    icon: TbMountain,
    description: "Khách sạn này nằm ở vùng nông thôn!",
  },
  {
    label: "Hồ bơi",
    icon: TbPool,
    description: "Khách sạn này có một hồ bơi!",
  },
  {
    label: "Quần đảo",
    icon: GiIsland,
    description: "Khách sạn này nằm trên một hòn đảo!",
  },
  {
    label: "Hồ",
    icon: GiBoatFishing,
    description: "Khách sạn này nằm gần một cái hồ!",
  },
  {
    label: "Trượt tuyết",
    icon: FaSkiing,
    description: "Khách sạn này có hoạt động trượt tuyết!",
  },
  {
    label: "Lâu đài",
    icon: GiCastle,
    description: "Khách sạn này là một lâu đài cổ!",
  },
  {
    label: "Hang động",
    icon: GiCaveEntrance,
    description: "Khách sạn này nằm trong một hang động",
  },
  {
    label: "Cắm trại",
    icon: GiForestCamp,
    description: "Khách sạn này cung cấp các hoạt động cắm trại!",
  },
  {
    label: "Bắc cực",
    icon: BsSnow,
    description: "Khách sạn này nằm trong môi trường bắc cực!",
  },
  {
    label: "Sa mạc",
    icon: GiCactus,
    description: "Khách sạn này là trong sa mạc!",
  },
  {
    label: "Trang trại",
    icon: GiBarn,
    description: "Khách sạn này là một trang trại!",
  },
  {
    label: "Sang trọng",
    icon: IoDiamond,
    description: "Khách sạn này là thương hiệu mới và sang trọng!",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
