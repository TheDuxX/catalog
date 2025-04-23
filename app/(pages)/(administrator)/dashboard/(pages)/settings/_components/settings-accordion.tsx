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
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="profile">Perfil</TabsTrigger>
        <TabsTrigger value="users-management">Usuários</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <Card className="w-full">
          <CardContent className="flex justify-center items-center">
            <UserForm />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="users-management">
        <Card className="w-full">
          <CardContent className="flex justify-center items-center">
            <UserManagement />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default SettingsPage;
