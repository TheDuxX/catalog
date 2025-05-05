import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";

const SettingsFilters = () => {
  return (
    <div className="w-full flex flex-col md:grid md:grid-cols-2 gap-4 ">
      <Card className="bg-white">
        <CardContent className="p-0">
          <CardHeader className="font-semibold">Categorias</CardHeader>
        </CardContent>
      </Card>
      <Card className="bg-white">
        <CardContent className="p-0">
          <CardHeader className="font-semibold">Marcas</CardHeader>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsFilters;
