import { UserRole } from "./user-role.enum";
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  Username: String;
  Password: String;
  Role: UserRole;
  FirstName: String;
  LastName: String;
  City: String;
  Age: Number;
  Description: String;
}

const UserSchema: Schema = new Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Role: { type: UserRole, required: true },
  FirstName: { type: String},
  LastName: { type: String},
  City: { type: String},
  Age: { type: String},
  Description: { type: String},
}, {collection: 'Users'});

const User = mongoose.model<IUser>("Users", UserSchema);
export default User;
