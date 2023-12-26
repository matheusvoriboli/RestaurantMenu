"use client";

type HeaderProps = {
  title: string;
};

export default function Header ({title}: HeaderProps) {
  return (
    <div className="nav-bg text-white flex justify-center items-center py-5 px-12">{title}</div>
  );
};
