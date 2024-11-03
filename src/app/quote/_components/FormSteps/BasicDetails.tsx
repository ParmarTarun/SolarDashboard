import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ZoneInput from "@/components/ZoneInput";
import { useFormContext } from "@/hooks/use-quote-form";

const BasicDetails = () => {
  const { formData, setFormData } = useFormContext();

  return (
    <div className="mx-auto grid w-[50%] grid-cols-8 items-center gap-8 text-lg">
      <div className="col-span-4">
        <Label htmlFor="name" className="text-lg">
          Your Name
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div className="col-span-6">
        <Label htmlFor="email" className="text-lg">
          Your Email
        </Label>
        <Input
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div className="col-span-6">
        <Label htmlFor="zone" className="mr-4 text-lg">
          Zone
        </Label>
        <ZoneInput
          zone={formData.zone}
          setZone={(v) => setFormData({ ...formData, zone: v })}
        />
      </div>
    </div>
  );
};

export default BasicDetails;
