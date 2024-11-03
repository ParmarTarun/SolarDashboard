import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "@/hooks/use-quote-form";
import { Switch } from "@/components/ui/switch";

const HouseholdDetails = () => {
  const { formData, setFormData } = useFormContext();
  return (
    <div className="mx-auto grid w-1/2 grid-cols-8 items-center gap-8 text-lg">
      <div className="col-span-6">
        <Label htmlFor="name" className="mb-2 text-lg">
          How many people live in you house?
        </Label>
        <Select
          onValueChange={(v) => setFormData({ ...formData, noOfPeople: +v })}
          value={formData.noOfPeople.toString()}
        >
          <SelectTrigger className="w-[200px] text-lg">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Source</SelectLabel>
              {[1, 2, 3, 4].map((n) => (
                <SelectItem value={n.toString()} key={n}>
                  {n.toString()}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-6">
        <div className="flex items-center space-x-2">
          <Switch
            id="hasSolarPanel"
            onCheckedChange={(v) =>
              setFormData({
                ...formData,
                hasSolarPanel: v,
              })
            }
          />
          <Label htmlFor="hasSolarPanel" className="text-lg">
            Do you have solar panel installed?
          </Label>
        </div>
      </div>
      <div className="col-span-6">
        <div className="flex items-center space-x-2">
          <Switch
            id="electricVehicle"
            onCheckedChange={(v) =>
              setFormData({
                ...formData,
                electricVehicle: v,
              })
            }
          />
          <Label htmlFor="electricVehicle" className="text-lg">
            Do you have an electric Vehicle?
          </Label>
        </div>
      </div>
      <div className="col-span-6">
        <div className="flex items-center space-x-2">
          <Switch
            id="stayHome"
            onCheckedChange={(v) =>
              setFormData({
                ...formData,
                stayHome: v,
              })
            }
          />
          <Label htmlFor="stayHome" className="text-lg">
            Do pepole stay home during weekdays?
          </Label>
        </div>
      </div>
    </div>
  );
};

export default HouseholdDetails;
