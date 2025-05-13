import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Log } from "../_services/logs-service";
import {
  badgeColors,
  formatedDateandHour,
} from "../_viewmodels/useLogList";
import { useUsersList } from "../../../_viewmodels/useUsers";


interface LogCardProps {
  log: Log;
}

const LogCard = ({ log }: LogCardProps) => {
  const { data: users, isLoading: isLoadingUsers } = useUsersList();
  const user = users?.find((user) => user.id === log.user_id);

  return (
    <>
      <Card className={`bg-white overflow-hidden`}>
        <CardContent className="p-2 py-4 relative">
          <span
            className={`absolute w-2 h-full left-0 top-0 ${badgeColors(
              log.action
            )}`}
          />
          <div className="flex items-center justify-between w-full h-full text-sm pl-2 gap-4">
            <p className="truncate">{log.details}</p>
            <p className="truncate">{formatedDateandHour(log.created_at)}</p>
           
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default LogCard;
