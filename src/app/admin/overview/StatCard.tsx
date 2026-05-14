import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | React.ReactNode  ;
  change?: string;
  direction?: 'neutral' | 'positive' | 'negative';
}

export function StatCard({ title, value, change, direction = 'neutral' }: StatCardProps) {
  return (
    <Card className="w-full bg-muted/20">
      <CardContent className={`p-4  ${change ? "flex items-start justify-between" : ""}`}>
        {change ?
          <div className="col-span-3 flex flex-col justify-center">
            <h2 className="text-xs sm:text-sm text-muted-foreground mb-0 sm:mb-2">{title}</h2>
            <p className="text-xl sm:text-3xl font-semibold text-primary">{value}</p>
          </div>
          :
          <>
            <h2 className="text-xs sm:text-sm text-muted-foreground mb-0 sm:mb-2">{title}</h2>
            <p className="text-xl sm:text-3xl font-semibold text-primary">{value}</p>
          </> 
        }
        {
          !change || 
          <div
            className={`mt-1 text-xs font-medium ${
              direction === "positive"
                ? "text-green-500"
                : direction === "negative"
                ? "text-red-400"
                : "text-gray-500"
            }`}
          >
            <p className="border border-muted p-1 w-min rounded-full">
              {direction === "positive" && "+"}
              {direction === "negative" && "-"}
              {direction === "neutral" ? "0%" : Math.abs(Number(change)) + "%"}
            </p>
          </div>

        }
      </CardContent>
    </Card>
  );
}
