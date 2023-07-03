import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  request: Request, 
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }


  const body = await request.json();
  const { 
    title,
    description,
    imageSrc,
    category,
    roomCount,
    guestCount,
    bathroomCount,
    location,
    price,
   } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const parsedGuestCount = parseInt(guestCount, 10);
  if (isNaN(parsedGuestCount)) {
    console.error('Giá trị guestCount không phải là một số hợp lệ');
  } else {

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        guestCount: parsedGuestCount,
        bathroomCount,
        locationValue: location.value,
        price: parseInt(price, 10),
        userId: currentUser.id
      } as any
    });
  return NextResponse.json(listing);
}

}
