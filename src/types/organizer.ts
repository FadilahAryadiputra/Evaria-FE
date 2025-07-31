enum Role {
  USER,
  ORGANIZER,
}

export interface Organizer {
  id: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  profilePicture: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
