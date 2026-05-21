import Image from "next/image";

export const Cover = ({ children, background }) => {
  return (
    <div className="relative h-screen min-h-[400px] flex items-center justify-center bg-slate-800">
      <Image
        alt="Cover"
        src={background}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover mix-blend-soft-light"
      />

      <div className="max-w-5xl relative z-10 text-white text-4xl">
        {children}
      </div>
    </div>
  );
};