"use client";

type HeaderProps = {
  title: string;
};

export default function Header ({title}: HeaderProps) {
  return (
    <div className="header">{title}</div>
  );
};
