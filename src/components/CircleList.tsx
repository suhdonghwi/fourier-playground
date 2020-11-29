import React from "react";
import styled from "styled-components/macro";

import UnitCircle from "../types/UnitCircle";

const Container = styled.div`
  margin: 0 auto;
  width: 70%;
`;

const List = styled.ol`
  padding: 0;
  list-style-type: none;

  height: 350px;
  overflow: auto;

  background-color: #f1f3f5;
  border-radius: 0.2rem;
`;

const ListItem = styled.li`
  margin: 1rem 0;
  background-color: #f1f3f5;
  padding: 1rem; 0;
  border-radius: 0.2rem;
  border: 1px solid #adb5bd;
`;

const Label = styled.div`
  display: inline-block;

  background-color: #37b24d;
  color: white;
  padding: 0.2rem 0.3rem;

  border-radius: 0.2rem;
`;

const Number = styled.span`
  font-family: monospace;
  font-size: 1.2rem;
`;

const AddInput = styled.input`
  font-size: 1.1rem;
  width: 100%;
  padding: 0.75rem;
  box-sizing: border-box;

  border: none;
  border: 1px solid #adb5bd;
  border-radius: 0.2rem;
  outline: none;
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
      <AddInput type="text" placeholder="반지름, 계수, 초기각" />
    </Container>
  );
}
