import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import UserForm from "../../../_components/userForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import UserManagement from "./user-management";

const SettingsPage = () => {
  return (
    <div className="grid grid-cols-3 gap-2">
      <Card className="w-full ">
        <CardContent className="flex w-full justify-center items-center">
          <UserForm />
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardContent className="flex justify-center items-center">
          <UserManagement />
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
