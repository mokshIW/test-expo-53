export type Badge = {
  //   "@id": string;
  //   "@type": string;
  id: number;
  title: string;
  description: string;
  badgeImage?: string;
  createdAt: string;
};

export type UserBadge = {
  "@id": string;
  "@type": string;
  id: number;
  badgeId: Badge; // ✅
  earnedCount: number;
  earnedAt: string;
};

export type AuthenticatedUser = {
  id: number;
  username: string;
  enabled?: boolean;
  userBadges?: UserBadge[];
  roles?: string[];
  userContact?: {
    firstName: string;
    lastName: string;
    phone?: string;
  };
  [key: string]: any;
};
