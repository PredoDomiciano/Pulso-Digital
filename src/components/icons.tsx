import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function SearchIcon(props: IconProps) {
  return <svg {...base} {...props}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg>;
}
export function MoonIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M20.8 15.2A8.5 8.5 0 1 1 8.8 3.3a7 7 0 0 0 12 11.9Z"/></svg>;
}
export function SunIcon(props: IconProps) {
  return <svg {...base} {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>;
}
export function ArrowIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
}
export function PlusIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M12 5v14M5 12h14"/></svg>;
}
export function EditIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/></svg>;
}
export function TrashIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 10v6M14 10v6"/></svg>;
}
export function UploadIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M12 16V4M7 9l5-5 5 5M5 20h14"/></svg>;
}
export function MenuIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
}
export function XIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M6 6l12 12M18 6 6 18"/></svg>;
}
export function CopyIcon(props: IconProps) {
  return <svg {...base} {...props}><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>;
}
export function ExternalIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M14 3h7v7M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></svg>;
}
