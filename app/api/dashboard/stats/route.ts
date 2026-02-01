import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [componentCount, userCount, savedCount] = await Promise.all([
      prisma.component.count(),
      prisma.user.count(),
      prisma.userSavedComponent.count({
        where: { userId: session.user.id }
      }),
    ]);

    // Mock growth for now, but real counts from DB
    return NextResponse.json({
      stats: [
        {
          title: "Total Components",
          value: componentCount.toString(),
          description: "Available in library",
          trend: "+5% from last week"
        },
        {
          title: "Your Saved",
          value: savedCount.toString(),
          description: "Bookmarked items",
          trend: "Recently updated"
        },
        {
          title: "Community Size",
          value: userCount.toString(),
          description: "Active builders",
          trend: "+12% growth"
        },
        {
          title: "Usage Rate",
          value: "89%",
          description: "Component deployment",
          trend: "High performance"
        }
      ],
      recentActivity: await prisma.component.findMany({
        take: 3,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          createdAt: true
        }
      })
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
