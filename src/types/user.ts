enum UserRole {
  USER,
  ORGANIZER,
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  profilePicture: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
