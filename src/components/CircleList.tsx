import React from "react";

import UnitCircle from "../types/UnitCircle";

interface CircleListProps {
  value: UnitCircle[];
  onChange: (d: UnitCircle[]) => void;
}

export default function CircleList({ value, onChange }: CircleListProps) {
  return <div></div>;
}
