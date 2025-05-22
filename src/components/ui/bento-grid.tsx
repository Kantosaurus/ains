import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4 md:auto-rows-[220px] grid-flow-dense",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento relative overflow-hidden rounded-xl transition duration-200 h-full",
        className,
      )}
    >
      {header}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-black/0">
        <div className="flex items-center space-x-2 mb-2">
          <div className="p-1 rounded-full bg-white/10 backdrop-blur-md">
            {icon}
          </div>
          <div className="font-sans font-bold text-white">
            {title}
          </div>
        </div>
        <div className="font-sans text-xs text-white/80 group-hover/bento:opacity-100 opacity-80">
          {description}
        </div>
      </div>
    </div>
  );
}; 