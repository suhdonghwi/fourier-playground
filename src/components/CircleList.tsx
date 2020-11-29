import React from "react";
import styled from "styled-components/macro";

import UnitCircle from "../types/UnitCircle";

const Container = styled.div``;

const List = styled.ol`
  list-style-type: none;

  height: 300px;
  overflow: auto;
  border-radius: 0.2rem;

  background-color: #f8f9fa;
  padding: 1rem;
`;

const ListItem = styled.li`
  margin: 1rem 0;
  background-color: #f1f3f5;
  padding: 1rem; 0;
  border-radius: 0.3rem;
  border: 1px solid #adb5bd;
`;

const Label = styled.span`
  background-color: #37b24d;
  color: white;
  padding: 0.2rem 0.3rem;

  border-radius: 0.2rem;
`;

const Number = styled.span`
  font-family: monospace;
  font-size: 1.2rem;
`;

interface CircleListProps {
  value: UnitCircle[];
  onChange: (d: UnitCircle[]) => void;
}

export default function CircleList({ value, onChange }: CircleListProps) {
  return (
    <Container>
      <List>
        {value.map((c) => (
          <ListItem>
            <Label>반지름</Label> <Number>{c.radius.toFixed(3)} </Number>
            <Label>계수</Label> <Number>{c.coefficient.toFixed(3)} </Number>
            <Label>초기각</Label> <Number>{c.phi.toFixed(3)}</Number>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
