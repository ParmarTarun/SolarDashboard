import { Label } from "@/components/ui/label";
import { useFormContext } from "@/hooks/use-quote-form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const UtilityDetails = () => {
  const { formData, setFormData } = useFormContext();
  return (
    <div className="mx-auto grid w-1/2 grid-cols-8 items-center gap-8 text-lg">
      <div className="col-span-6">
        <Label htmlFor="name" className="mb-2 text-lg">
          Please upload utility bill here
        </Label>
        <Input id="bill" type="file" className="cursor-pointer" />
      </div>
      <div className="col-span-6">
        <h2 className="text-2xl">OR</h2>
      </div>
      <div className="col-span-4">
        <Label htmlFor="name" className="text-lg">
          Enter manually
        </Label>
        <Badge className="mb-4 ml-4">in kWh</Badge>
        <Input
          id="utility-bill"
          value={formData.utilityBill}
          onChange={(e) =>
            setFormData({ ...formData, utilityBill: +e.target.value })
          }
          type="number"
        />
      </div>
    </div>
  );
};

export default UtilityDetails;
