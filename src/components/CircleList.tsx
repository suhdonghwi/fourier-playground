import React, { useState } from "react";
import styled from "styled-components/macro";

import UnitCircle from "../types/UnitCircle";

const Container = styled.div`
  margin: 0 auto;
  width: 70%;
`;

const List = styled.ol`
  margin: 0rem 0 1rem 0;

  padding: 0.5rem 1rem;
  list-style-type: none;

  height: 350px;
  overflow: auto;

  background-color: #f1f3f5;
  border-radius: 0.2rem;
`;

const ListItem = styled.li`
  cursor: pointer;

  margin: 1rem 0;
  padding: 1rem; 0;
  border-radius: 0.2rem;
  border: 1px solid #adb5bd;

  background-color: white;

  display: flex;
  flex-wrap: wrap;

  transition: background-color 0.2s;
  &:hover {
    background-color: #ffe3e3;
  }
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;

  margin: 0.2rem 0;
`;

const Label = styled.div`
  display: inline-block;

  background-color: #37b24d;
  color: white;
  padding: 0.2rem 0.3rem;

  border-radius: 0.2rem;
`;

const Number = styled.div`
  font-family: monospace;
  font-size: 1.2rem;

  margin: 0 0.5rem;
`;

const InputContainer = styled.div`
  display: flex;
`;

const AddInput = styled.input`
  flex: 1;
  font-size: 1.1rem;
  width: 100%;
  padding: 0.75rem;
  box-sizing: border-box;

  border: none;
  border: 1px solid #adb5bd;
  border-radius: 0.2rem;
  outline: none;
  appearance: none;

  margin-right: 0.5rem;
`;

const AddButton = styled.input`
  cursor: pointer;

  border: none;
  border-radius: 0.2rem;

  font-size: 1rem;
  padding: 0 1rem;

  appearance: none;
  background-color: #37b24d;
  color: white;
`;

interface CircleListProps {
  value: UnitCircle[];
  onChange: (d: UnitCircle[]) => void;
}

export default function CircleList({ value, onChange }: CircleListProps) {
  const [addText, setAddText] = useState("");

  function onAdd() {
    const integers = addText.split(",").map((n) => parseInt(n));
    if (integers.length === 3 && integers.every((v) => !isNaN(v))) {
      onChange(
        value.concat({
          radius: integers[0],
          coefficient: integers[1],
          phi: integers[2],
        })
      );

      setAddText("");
    }
  }

  function onRemove(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <Container>
      <List>
        {value.map((c, i) => (
          <ListItem key={i} onClick={() => onRemove(i)}>
            <InfoBox>
              <Label>반지름</Label> <Number>{c.radius.toFixed(3)} </Number>
            </InfoBox>
            <InfoBox>
              <Label>계수</Label> <Number>{c.coefficient.toFixed(3)} </Number>
            </InfoBox>
            <InfoBox>
              <Label>초기각</Label> <Number>{c.phi.toFixed(3)}</Number>
            </InfoBox>
          </ListItem>
        ))}
      </List>
      <InputContainer>
        <AddInput
          type="text"
          placeholder="반지름, 계수, 초기각"
          value={addText}
          onChange={(e) => setAddText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && onAdd()}
        />
        <AddButton type="button" value="추가" onClick={onAdd} />
      </InputContainer>
    </Container>
  );
}
